import { ActivityType, Events } from "discord.js";
import BotEvent from "modules/event";

export default new BotEvent({
  event: Events.ClientReady,
  async run(client) {
    console.log(`Logged in as ${client.user!.tag}!`);

    client.user!.setActivity("with Toby", { type: ActivityType.Playing });
  },
});
