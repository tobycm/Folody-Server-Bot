import Folody from "Folody";
import { Events, Guild } from "discord.js";
import Event from "modules/event";

async function onGuildCreate(guild: Guild) {
  console.log(`Joined guild ${guild.name}!`);

  (guild.client as Folody).db.set(`${guild.id}`, {});
}

export default new Event({
  eventName: Events.GuildCreate,
  run: onGuildCreate,
});
