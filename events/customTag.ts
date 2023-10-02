import Folody from "Folody";
import { Events } from "discord.js";
import BotEvent from "modules/event";
import CustomTags from "modules/models/customTags";

export default new BotEvent({
  event: Events.MessageCreate,
  async run(message) {
    if (message.author.bot) return;
    if (!message.inGuild()) return;

    const folody = message.client as Folody;

    const customTags =
      (await folody.db.get<CustomTags>(`${message.guild.id}.customTags`)) || {};

    const customTag = customTags[message.content.toLowerCase()];
    if (!customTag) return;

    message.channel.send(customTag.content);
  },
});
