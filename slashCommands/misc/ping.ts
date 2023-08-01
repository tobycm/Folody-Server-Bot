import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  inlineCode,
} from "discord.js";
import { SlashCommand } from "modules/command";

async function pingCommand(interaction: ChatInputCommandInteraction) {
  interaction.reply(
    `Pong! ${inlineCode(String(interaction.client.ws.ping))}ms`
  );
}

export default new SlashCommand({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Bot lag thế nhở"),
  run: pingCommand,
});
