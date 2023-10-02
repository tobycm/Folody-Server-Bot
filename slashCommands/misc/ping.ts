import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  inlineCode,
} from "discord.js";
import { SlashCommand } from "modules/command";

export default new SlashCommand({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Bot lag thế nhở"),
  async run(interaction: ChatInputCommandInteraction) {
    interaction.reply(
      `Pong! ${inlineCode(String(interaction.client.ws.ping))}ms`
    );
  },
});
