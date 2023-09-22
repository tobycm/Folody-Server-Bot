import { Events, userMention } from "discord.js";
import Event from "modules/event";

let timeout = false;

export default new Event({
  eventName: Events.MessageCreate,
  async run(message) {
    if (timeout || message.author.id != "487597510559531009") return;

    timeout = true;

    setTimeout(
      () => {
        message.channel.send(
          `${userMention("487597510559531009")} nghỉ mắt đi toby`
        );
        timeout = false;
      },
      1000 * 60 * 20
    ); // 20 20 20 rule
  },
});
