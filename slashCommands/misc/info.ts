import { ChatInputCommandInteraction, SlashCommandBuilder, inlineCode, userMention } from "discord.js";
import { SlashCommand } from "modules/command";
import { getCurrentGitBranch, getCurrentGitHash, secondsToTime } from "modules/utils";

export default new SlashCommand({
  data: new SlashCommandBuilder().setName("info").setDescription("thông tin của bot nè"),
  async run(interaction: ChatInputCommandInteraction) {
    interaction.reply(
      `Made by ${userMention("487597510559531009")}\n\n` +
        `Version: ${inlineCode(getCurrentGitHash().slice(-7))} on ${inlineCode(getCurrentGitBranch())}\n` +
        `Ping: ${interaction.client.ws.ping}ms\n` +
        `Uptime: ${inlineCode(secondsToTime(interaction.client.uptime / 1000))}\n`,
    );
  },
});
