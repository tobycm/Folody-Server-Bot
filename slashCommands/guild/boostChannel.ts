import Folody from "Folody";
import {
  ChannelType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "modules/command";

const boostChannelCommandData = new SlashCommandBuilder()
  .setName("boost_channel")
  .setDescription("Set boost channel hoặc xem boost channel đã được cài đặt");

boostChannelCommandData.addChannelOption((option) =>
  option
    .setName("channel")
    .setDescription("Channel để set boost channel")
    .setRequired(false)
    .addChannelTypes(
      ChannelType.AnnouncementThread,
      ChannelType.GuildAnnouncement,
      ChannelType.PublicThread,
      ChannelType.PrivateThread,
      ChannelType.GuildText
    )
);

async function boostChannelCommand(interaction: ChatInputCommandInteraction) {
  const channel = interaction.options.getChannel("channel", false);
  if (!channel) {
    const boostChannel = (interaction.client as Folody).db.get<string>(
      `guild.${interaction.guildId}.channel.boost`
    );
    if (!boostChannel)
      return interaction.reply("Chưa có boost channel nào được cài đặt!");
    return interaction.reply(`Boost channel hiện tại là <#${boostChannel}>`);
  }

  (interaction.client as Folody).db.set(
    `guild.${interaction.guildId}.channel.boost`,
    channel.id
  );
  return interaction.reply(`Đã set boost channel thành <#${channel.id}>`);
}

export default new SlashCommand({
  data: boostChannelCommandData,
  run: boostChannelCommand,
});
