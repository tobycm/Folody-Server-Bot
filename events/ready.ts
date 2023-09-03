import { ActivityType, Client, Events } from "discord.js";
import Event from "modules/event";

async function onReady(folody: Client) {
  console.log(`Logged in as ${folody.user!.tag}!`);

  // activity case
  setTimeout(() => {
    const statuses = [
      `<:folody:933915537233289336> Folody Studio | f!help`,
      `<:leuleu:1135840069257805895> f!help for help | f!help`,
      `<:mrStorm:1120554787298086943> chat to become Chad | f!help`,
    ];

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    folody.user?.setActivity(status, { type: ActivityType.Listening });
  }, 2000);
}

export default new Event({
  eventName: Events.ClientReady,
  run: onReady,
});
