import Folody from "Folody";
import {
  Message,
  PermissionsBitField,
  TextChannel,
  channelMention,
} from "discord.js";
import { MessageCommand } from "modules/command.js";
import { GuildExceptions } from "modules/exceptions/index.js";
import { Optional } from "modules/usageArgumentTypes.js";

async function setWelcomeChannelCommand(message: Message<true>) {
  const folody = message.client as Folody;

  if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageGuild))
    throw new GuildExceptions.NoPermissions();

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

  // TODO: check if channelID exists

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
  usage: [Optional("channel")],
  run: setWelcomeChannelCommand,
});
