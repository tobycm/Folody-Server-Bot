import Folody from "Folody";
import { Events } from "discord.js";
import Event from "modules/event";

export default new Event({
  eventName: Events.GuildCreate,
  async run(guild) {
    console.log(`Joined guild ${guild.name}!`);

    (guild.client as Folody).db.set(`${guild.id}`, {});
  },
});
