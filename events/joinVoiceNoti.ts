import { Events, userMention } from "discord.js";
import BotEvent from "modules/event";

export default new BotEvent({
  event: Events.VoiceStateUpdate,
  async run(oldState, newState) {
    const channel = newState.channel;
    if (!channel) return;

    if (oldState.channel) return;

    const member = newState.member;
    if (!member) return;

    channel.send({
      content: `Có bạn ${userMention(member.id)} vừa tham gia voice nè!`
    });
  },
});
