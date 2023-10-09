import { Events } from "discord.js";
import BotEvent from "modules/event";

export default new BotEvent({
  event: Events.MessageCreate,
  async run(message) {
    if (
      message.content.startsWith("ogive") ||
      message.content.startsWith("owogive")
    ) {
      
      if (
        !message.content.split(" ")[1] ||
        isNaN(Number(message.content.split(" ")[2])) ||
        !message.content.split(" ")[2]
      )
        return;
      else if (message.content.split(" ")[1] === "<@926643835419910184>")
        return message.reply(
          `> <a:nhoamnhoam:1145729266517016606> cảm ơn bạn ${
            message.member
          } đã donate cho bọn mình **_${
            message.content.split(" ")[2]
          }_ cowoncy** nha!`
        );
    }
  },
});
