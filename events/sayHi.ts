// chào mem xd, ko hỉu thì đọc code đi xd

import { Events } from "discord.js";
import BotEvent from "modules/event";

const lastMessageCache = new Map<string, number>();

export default new BotEvent({
  // disabled: true, // hư quá nên tạm disable v :>
  event: Events.MessageCreate,
  async run(message) {
    if (message.author.bot) return;

    if (!lastMessageCache.has(message.author.id)) return lastMessageCache.set(message.author.id, message.createdTimestamp);

    const lastMessageTimestamp = lastMessageCache.get(message.author.id)!;

    lastMessageCache.set(message.author.id, message.createdTimestamp);

    if (message.createdTimestamp - lastMessageTimestamp < 1000 * 60 * 60 * 6) return; // 6h

    message.channel.send(`Chào mừng bạn đã quay lại ${message.author} `);
  },
});

setInterval(() => lastMessageCache.clear(), 1000 * 60 * 60 * 24 * 7 * 2); // 2 tuần
