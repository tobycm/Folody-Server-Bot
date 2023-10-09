import { channelMention } from "@discordjs/builders";
import Folody from "Folody";
import { EmbedBuilder, Message, PermissionFlagsBits } from "discord.js";
import { checkPermissions } from "modules/checks/access";
import { MessageCommand } from "modules/command";

async function getWelcomeChannelCommand(message: Message<true>) {
  const folody = message.client as Folody;

  const welcomeChannelId = await folody.db.get<string>(`${message.guild.id}.channel.welcome`);

  if (!welcomeChannelId)
    return message.reply({ embeds: [new EmbedBuilder().setDescription("Server này chưa có kênh chào mừng").setColor(folody.branding.embedColor)] });

  message.reply({
    embeds: [
      new EmbedBuilder().setDescription(`Kênh chào mừng của server này là ${channelMention(welcomeChannelId)}`).setColor(folody.branding.embedColor),
    ],
  });
}

export default new MessageCommand({
  name: "getwelcomechannel",
  aliases: ["gwelcomechannel", "gwelcomec", "getwelcomec", "get_welcome_channel"],
  category: "guild",
  description: "Xem kênh chào mừng tại máy của bạn",
  checks: [checkPermissions([PermissionFlagsBits.ManageGuild])],
  run: getWelcomeChannelCommand,
});
