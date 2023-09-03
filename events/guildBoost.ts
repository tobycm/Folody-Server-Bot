import {
  Events,
  GuildTextBasedChannel,
  Message,
  MessageType,
  userMention,
} from "discord.js";
import Folody from "Folody";
import Event from "modules/event";

async function onGuildBooster(message: Message) {
  if (message.author.bot || message.inGuild()) return;

  if (
    ![
      MessageType.GuildBoost,
      MessageType.GuildBoostTier1,
      MessageType.GuildBoostTier2,
      MessageType.GuildBoostTier3,
    ].includes(message.type)
  )
    return;

  (
    message.guild!.channels.cache.get(
      (await (message.client as Folody).db.get<string>(
        `guild.${message.guild!.id}.channel.boost`
      )) ?? "955639718815621151"
    ) as GuildTextBasedChannel
  ).send({
    content: `${userMention("867741983774212166")} Yoooooo có ng boost kìa men`,
  });
}

export default new Event({
  eventName: Events.MessageCreate,
  run: onGuildBooster,
});
