import { ActivityType, Client, Events } from "discord.js";
import Event from "modules/event";

async function onReady(folody: Client) {
  console.log(`Logged in as ${folody.user!.tag}!`);

  folody.user!.setActivity("with Toby", { type: ActivityType.Playing });
}

export default new Event({
  eventName: Events.ClientReady,
  run: onReady,
});
