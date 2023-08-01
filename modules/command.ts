import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Message,
  SlashCommandBuilder,
} from "discord.js";
import { Argument } from "./usageArgumentTypes";

interface MessageCommandOptions {
  name: string;
  aliases?: string[];
  category?: string;
  usage?: Argument[];
  description: string;
  managerOnly?: boolean;
  ownerOnly?: boolean;
  nsfw?: boolean;
  run: (message: Message<true>, ...args: string[]) => Promise<any>;
  disabled?: boolean;
}

export class MessageCommand {
  constructor(options: MessageCommandOptions) {
    this.name = options.name;
    this.description = options.description;
    this.aliases = options.aliases ?? [];
    this.category = options.category;
    this.usage = options.usage ?? [];
    this.nsfw = options.nsfw ?? false;

    this.managerOnly = options.managerOnly ?? false;
    this.ownerOnly = options.ownerOnly ?? false;

    this.run = options.run;

    this.disabled = options.disabled ?? false;
  }

  public readonly name: string;
  public readonly description: string;
  public readonly aliases: string[];
  public readonly category?: string;
  public readonly usage: Argument[];
  public readonly nsfw: boolean;

  public readonly managerOnly: boolean;
  public readonly ownerOnly: boolean;

  public readonly run: (
    message: Message<true>,
    ...args: string[]
  ) => Promise<any>;

  public readonly disabled: boolean;
}

interface SlashCommandOptions {
  managerOnly?: boolean;
  ownerOnly?: boolean;
  guildsOnly?: boolean;
  data: SlashCommandBuilder;
  run: (interaction: ChatInputCommandInteraction) => Promise<any>;
  completion?: (interaction: AutocompleteInteraction) => Promise<any>;
  disabled?: boolean;
}

export class SlashCommand {
  constructor(options: SlashCommandOptions) {
    this.data = options.data;
    this.managerOnly = options.managerOnly ?? false;
    this.ownerOnly = options.ownerOnly ?? false;
    this.guildsOnly = options.guildsOnly ?? false;

    this.run = options.run;
    this.completion = options.completion;

    this.disabled = options.disabled ?? false;
  }

  public readonly data: SlashCommandBuilder;

  public readonly managerOnly: boolean;
  public readonly ownerOnly: boolean;

  public readonly guildsOnly: boolean;

  public readonly run: (
    interaction: ChatInputCommandInteraction
  ) => Promise<any>;
  public readonly completion?: (
    interaction: AutocompleteInteraction
  ) => Promise<void>;

  public readonly disabled: boolean;
}
