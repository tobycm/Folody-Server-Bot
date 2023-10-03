import Folody from "Folody";
import {
  Message,
  PermissionFlagsBits,
  TextChannel,
  channelMention,
} from "discord.js";
import { checkPermissions } from "modules/checks/access";
import { MessageCommand } from "modules/command.js";

async function setWelcomeChannelCommand(message: Message<true>) {
  const folody = message.client as Folody;

  const channel = message.mentions.channels.first() as TextChannel;
  if (!channel) {
    if (await folody.db.get(`${message.guild.id}.channel.welcome`)) {
      folody.db.delete(`${message.guild.id}.channel.welcome`);
      return message.reply({
        embeds: [
          {
            description: `Đã bỏ chọn ${channelMention(
              await folody.db.get(`${message.guild.id}.channel.welcome`)
            )} là kênh chào mừng`,
            color: folody.branding.embedColor,
          },
        ],
      });
    }
    return message.reply({
      embeds: [
        {
          description: `Server này chưa có kênh chào mừng`,
          color: folody.branding.embedColor,
        },
      ],
    });
  }

  folody.db.set<string>(`${message.guild.id}.channel.welcome`, channel.id);
  message.reply({
    embeds: [
      {
        description: `Đã chọn ${channelMention(channel.id)} là kênh chào mừng`,
        color: folody.branding.embedColor,
      },
    ],
  });
}

export default new MessageCommand({
  name: "setwelcomechannel",
  aliases: [
    "swelcomechannel",
    "swelcomec",
    "setwelcomec",
    "setwc",
    "swelcomechannel",
    "set_welcome_channel",
  ],
  category: "guild",
  description: "Chọn kênh chào mừng cho máy chủ của bạn",
  checks: [checkPermissions([PermissionFlagsBits.ManageGuild])],
  run: setWelcomeChannelCommand,
});
