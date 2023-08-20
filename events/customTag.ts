import Folody from "Folody";
import { Events } from "discord.js";
import Event from "modules/event";
import CustomTags from "modules/models/custom_tags";

export default new Event({
  eventName: Events.MessageCreate,
  async run(message) {
    if (message.author.bot) return;
    if (!message.inGuild()) return;

    const folody = message.client as Folody;

    const customTags =
      (await folody.db.get<CustomTags>(`${message.guild.id}.customTags`)) || {};

    const customTag = customTags[message.content];
    if (!customTag) return;

    message.channel.send(customTag.content);
  },
});
