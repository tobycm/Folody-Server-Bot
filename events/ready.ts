import { Client, Events } from "discord.js";
import Event from "../modules/event";

async function onReady(folody: Client) {
  console.log(`Logged in as ${folody.user!.tag}!`);
}

export default new Event({
  eventName: Events.ClientReady,
  run: onReady,
});
