import { channelMention } from "@discordjs/builders";
import Folody from "Folody";
import { Message } from "discord.js";
import { MessageCommand } from "modules/command";

async function getWelcomeChannelCommand(message: Message<true>) {
  const folody = message.client as Folody;

  const channelID = await folody.db.get(message.guild.id + ".channel.welcome");

  if (!channelID)
    message.reply({
      embeds: [
        {
          description: "Server này chưa có kênh chào mừng",
          color: folody.branding.embedColor,
        },
      ],
    });

  message.reply({
    embeds: [
      {
        description: `Kênh chào mừng của server này là ${channelMention(
          channelID
        )}`,
        color: folody.branding.embedColor,
      },
    ],
  });
}

export default new MessageCommand({
  name: "getwelcomechannel",
  aliases: [
    "gwelcomechannel",
    "gwelcomec",
    "getwelcomec",
    "get_welcome_channel",
  ],
  category: "guild",
  description: "Xem kênh chào mừng tại máy của bạn",
  run: getWelcomeChannelCommand,
});
