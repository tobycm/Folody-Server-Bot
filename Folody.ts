import { Client, ClientOptions, GatewayIntentBits, Snowflake, codeBlock } from "discord.js";

import { QuickDB } from "quick.db";

import config from "config";

import loadCommands from "handlers/commandLoader";
import database from "handlers/databaseLoader";
import loadEvents from "handlers/eventLoader";

import { MessageCommand, SlashCommand } from "modules/command";
import OpenAI, { ClientOptions as AIOptions } from "openai";

interface BrandingOptions {
  embedColor: number;
  emojis: {
    error: string;
    loading: string;
  };
}

interface Options extends ClientOptions {
  ai?: AIOptions;
  prefix?: string;

  owners?: string[];
  managers?: string[];

  branding?: BrandingOptions;
}

export default class Folody extends Client {
  constructor(options: Options) {
    super(options);

    this.ai = options.ai ? new OpenAI(options.ai) : undefined;

    this.defaultPrefix = options.prefix || "f!";
    this.prefixes = new Map<Snowflake, string>();

    this.owners = options.owners || [];
    this.managers = options.managers || [];

    this.messageCommands = new Map();
    this.slashCommands = new Map();

    this.db = database;

    this.branding = options.branding || {
      embedColor: 14406149,
      emojis: {
        error: "<a:alert:1081902415701356605>",
        loading: "<a:loading:1027196377245155348>",
      },
    };

    loadEvents(this);
    loadCommands(this);
  }

  public readonly ai?: OpenAI;

  private readonly defaultPrefix: string;

  private readonly prefixes: Map<Snowflake, string>;

  public async getPrefix(guildID: Snowflake): Promise<string> {
    const prefix = this.prefixes.get(guildID);
    if (prefix) return prefix;

    const dbPrefix = await this.db.get(`${guildID}.prefix`);
    if (!dbPrefix) {
      this.prefixes.set(guildID, this.defaultPrefix);
      return this.defaultPrefix;
    }

    this.prefixes.set(guildID, dbPrefix);
    return dbPrefix;
  }

  public async setPrefix(guildID: Snowflake, prefix: string): Promise<void> {
    this.prefixes.set(guildID, prefix);
    this.db.set(`${guildID}.prefix`, prefix);
  }

  public async reportError(error: Error): Promise<void> {
    console.log(error); // log ổn hơn
    const channel = await this.channels.fetch(config.bot.channels.error);
    if (!channel?.isSendable()) return;

    channel.send({
      embeds: [
        {
          title: "An error has occurred!",
          description: codeBlock("js", JSON.stringify(error, null, 2)),
          color: this.branding.embedColor
        }
      ]
    });
  }

  public readonly owners: Snowflake[];
  public readonly managers: Snowflake[];

  public readonly messageCommands: Map<string, MessageCommand>;
  public readonly slashCommands: Map<string, SlashCommand>;

  public readonly db: QuickDB;

  public readonly branding: BrandingOptions;
}

const folody = new Folody({
  ai: {
    apiKey: "a",
    baseURL: "https://ai.hackclub.com",
  },
  intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
  allowedMentions: {
    repliedUser: false
  },
  prefix: config.bot.prefix,

  owners: config.bot.owners,
  managers: config.bot.managers
});

folody.login(config.bot.token);
