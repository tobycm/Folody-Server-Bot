import { Events } from "discord.js";
import Event from "modules/event";

export default new Event({
  eventName: Events.MessageCreate,
  async run(message) {},
});
