import Folody from "Folody";
import { Events, userMention } from "discord.js";
import BotEvent from "modules/event";

export default new BotEvent({
  event: Events.MessageCreate,
  async run(message) {
    const folody = message.client as Folody;
    if (!(await folody.db.get<boolean>(`${message.author.id}.imBlind`))) return;
    if (await folody.db.get<boolean>(`${message.author.id}.blinded`)) return;

    await folody.db.set(`${message.author.id}.blinded`, true);

    setTimeout(
      () => {
        message.channel.send(`${userMention("487597510559531009")} nghỉ mắt đi nào :)`);
        folody.db.delete(`${message.author.id}.blinded`);
      },
      1000 * 60 * 20,
    ); // 20 20 20 rule
  },
});
