import { Events } from "discord.js";
import BotEvent from "modules/event";

export default new BotEvent({
  event: Events.MessageCreate,
  async run(message) {
    if (message.author.bot && message.channel.id === "955639718815621151") {
      
      await new Promise((resolve) => setTimeout(resolve, 1000 * 15)); // 15s
      
      message.delete();
    }
  },
});
