// chào mem xd, ko hỉu thì đọc code đi xd

import { Events, Message, userMention } from "discord.js";
import Event from "modules/event";

async function sayHi(message: Message) {
  if (message.author.bot) return;

  const authorMessages = message.channel.messages.cache.filter(
    (m) => m.author === message.author
  );

  for (const msg of authorMessages.values()) {
    if (message === msg) continue;
    if (msg.createdTimestamp < message.createdTimestamp - 1000 * 60 * 60)
      return;
    else
      return message.channel.send(`Wassup ${userMention(message.author.id)}`);
  }
}

export default new Event({
  disabled: true,
  eventName: Events.MessageCreate,
  run: sayHi,
});
