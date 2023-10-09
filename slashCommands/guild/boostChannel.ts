import Folody from "Folody";
import { ChannelType, ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { checkPermissions } from "modules/checks/access";
import { SlashCommand } from "modules/command";

const data = new SlashCommandBuilder().setName("boost_channel").setDescription("Set boost channel hoặc xem boost channel đã được cài đặt");

data.addChannelOption((option) =>
  option
    .setName("channel")
    .setDescription("Channel để set boost channel")
    .setRequired(false)
    .addChannelTypes(
      ChannelType.AnnouncementThread,
      ChannelType.GuildAnnouncement,
      ChannelType.PublicThread,
      ChannelType.PrivateThread,
      ChannelType.GuildText,
    ),
);

export default new SlashCommand({
  data,
  checks: [checkPermissions([PermissionFlagsBits.ManageGuild])],
  async run(interaction: ChatInputCommandInteraction) {
    const channel = interaction.options.getChannel("channel", false);
    if (!channel) {
      const boostChannel = (interaction.client as Folody).db.get<string>(`guild.${interaction.guildId}.channel.boost`);
      if (!boostChannel) return interaction.reply("Chưa có boost channel nào được cài đặt!");
      return interaction.reply(`Boost channel hiện tại là <#${boostChannel}>`);
    }

    (interaction.client as Folody).db.set(`guild.${interaction.guildId}.channel.boost`, channel.id);
    return interaction.reply(`Đã set boost channel thành <#${channel.id}>`);
  },
});
