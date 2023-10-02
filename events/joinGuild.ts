import Folody from "Folody";
import { Events } from "discord.js";
import BotEvent from "modules/event";

export default new BotEvent({
  event: Events.GuildCreate,
  async run(guild) {
    console.log(`Joined guild ${guild.name}!`);

    (guild.client as Folody).db.set(`${guild.id}`, {});
  },
});
