import { Events } from "discord.js";
import BotEvent from "modules/event";
import { sleep } from "modules/utils";

export default new BotEvent({
  event: Events.MessageCreate,
  async run(message) {
    if (!message.author.bot) return;
    if (message.channel.id !== "955639718815621151") return;

    await sleep(1000 * 15); // 15s

    if (!message) return;

    message.delete();
  },
});
