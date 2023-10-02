import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Message,
  SlashCommandBuilder,
} from "discord.js";

interface MessageCommandOptions {
  name: string;
  aliases?: string[];
  description: string;
  category?: string;
  help?: (message: Message<true>) => Promise<any>;
  validate?: (
    message: Message<true>,
    ...args: string[]
  ) => boolean | Promise<boolean>;
  checks?: ((message: Message<true>) => boolean | Promise<boolean>)[];
  run: (message: Message<true>, ...args: string[]) => Promise<any>;
  disabled?: boolean;
}

export class MessageCommand {
  constructor(options: MessageCommandOptions) {
    this.name = options.name;
    this.description = options.description;
    this.aliases = options.aliases ?? [];
    this.category = options.category;

    this.help = options.help;
    this.validate = options.validate;
    this.checks = options.checks ?? [];

    this.run = options.run;

    this.disabled = options.disabled ?? false;
  }

  public readonly name;
  public readonly description;
  public readonly aliases;
  public readonly category?;

  public readonly help?;
  public readonly validate?;
  public readonly checks;
  public readonly run;
  public readonly disabled;
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

  public readonly data;

  public readonly managerOnly;
  public readonly ownerOnly;

  public readonly guildsOnly;

  public readonly run;
  public readonly completion?;

  public readonly disabled;
}
