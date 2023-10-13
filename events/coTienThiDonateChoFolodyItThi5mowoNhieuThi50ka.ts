import { Events, userMention } from "discord.js";
import BotEvent from "modules/event";

async function sliceNumber(num: string) {
  const pattern = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(pattern, ",");
}

export default new BotEvent({
  event: Events.MessageUpdate,
  async run(oldMessage, newMessage) {
    if (newMessage.author?.id !== "408785106942164992") return;
    if (!newMessage.content) return;
    newMessage.content = newMessage.content.replaceAll("**", "");

    const msg = newMessage.content.split(" ");

    // akaix
    if (msg[7] !== `${userMention("926643835419910184")}!`) return;

    return newMessage.channel.send(`> <a:nhoamnhoam:1145729266517016606> cảm ơn bạn ${msg[2]} đã donate cho bọn mình **_${msg[4]}_ cowoncy** nha!`);
  },
});
