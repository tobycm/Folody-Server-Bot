// chào mem xd, ko hỉu thì đọc code đi xd

import { Events, Message, userMention } from "discord.js";
import Event from "modules/event";

async function sayHi(message: Message) {
  if (message.author.bot) return;

  if (
    message.channel.messages.cache.find((m) => {
      if (m.author !== message.author) return false;

      if (m.createdTimestamp < message.createdTimestamp - 1000 * 60 * 60)
        return false; // 1 hour
      return true;
    })
  ) {
    message.channel.send(`Wassup ${userMention(message.author.id)}`);
  }
}

export default new Event({
  eventName: Events.MessageCreate,
  run: sayHi,
});
