import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import Folody from "Folody";
import { checkPermissions } from "modules/checks/access";
import { guildOnly } from "modules/checks/guild";
import { SlashCommand } from "modules/command";

export default new SlashCommand({
  data: new SlashCommandBuilder().setName("ai").setDescription("oh mai gatto is that ai slop"),
  checks: [guildOnly, checkPermissions([PermissionFlagsBits.ManageMessages])],
  async run(interaction) {
    const folody = interaction.client as Folody;

    const allowedChannels = (await folody.db.get<string>(`${interaction.guild!.id}.ai.channels`))?.split(",") || [];

    if (allowedChannels.includes(interaction.channelId)) {
      await folody.db.set<string>(
        `${interaction.guild!.id}.ai.channels`,
        allowedChannels.filter((channel) => channel !== interaction.channelId).join(","),
      );
      return interaction.reply("Đã xóa kênh này khỏi danh sách kênh ai");
    }

    await folody.db.set<string>(`${interaction.guild!.id}.ai.channels`, [...allowedChannels, interaction.channelId].join(","));
    interaction.reply("Đã thêm kênh này vào danh sách kênh ai");
  },
});
