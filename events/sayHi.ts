// chào mem xd, ko hỉu thì đọc code đi xd

import { Events } from "discord.js";
import BotEvent from "modules/event";

export default new BotEvent({
  disabled: true, // hư quá nên tạm disable v :>
  event: Events.MessageCreate,
  async run(message) {
    if (message.author.bot) return;

    if (message.channel.messages.cache.size < 500)
      message.channel.messages.fetch({ limit: 500, cache: true });

    const authorMessages = message.channel.messages.cache.filter(
      (m) => m.author === message.author
    );

    if (authorMessages.size === 0 || authorMessages.size === 1)
      return message.channel.send(`Wassup ${message.author}`);

    const lastMessage = authorMessages.values().next().value;

    if (
      !(
        message.createdTimestamp - lastMessage.createdTimestamp <
        1000 * 60 * 60 * 6
      )
    )
      // 6 hours
      message.channel.send(`Wassup ${message.author}`);
  },
});
