import Folody from "Folody";
import CustomTags from "database/models/customTags";
import { Events, Message } from "discord.js";
import BotEvent from "modules/event";

interface CustomTagEvent {
  timestamp: number;
  message: Message;
}

const cooldowns = new Map<string, CustomTagEvent>();
let cooldownTime = 1000 * 30;

let flushTimeout: NodeJS.Timeout;

export default new BotEvent({
  event: Events.MessageCreate,
  async run(message) {
    if (message.author.bot) return;
    if (!message.inGuild()) return;

    const folody = message.client as Folody;

    const customTags = (await folody.db.get<CustomTags>(`${message.guild.id}.customTags`)) || {};
    const serverCooldown = (await folody.db.get<number>(`${message.guild.id}.customTag.cooldown`)) || cooldownTime;

    const customTag = customTags[message.content.toLowerCase()];
    if (!customTag) return;

    const cooldown = cooldowns.get(message.author.id);
    if ((cooldown?.timestamp || 0) + serverCooldown > Date.now()) return;

    message.channel.send(customTag.content);

    cooldowns.set(message.content.toLowerCase(), { timestamp: Date.now(), message });

    if (flushTimeout) return;

    flushTimeout = setTimeout(() => {
      const now = Date.now();
      for (const [tag, { timestamp }] of cooldowns) {
        if (timestamp + serverCooldown > now) continue;
        cooldowns.delete(tag);
      }
    }, serverCooldown * 2);
  },
});
