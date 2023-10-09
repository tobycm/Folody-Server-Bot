import { Events } from "discord.js";
import BotEvent from "modules/event";

/**
 * @param {Discord.Message} oldMessage
 * @param {Discord.Message} newMessage
 */
export default new BotEvent({
  event: Events.MessageUpdate,
  async run(oldmessage, newmessage) {
    if (newmessage.author.id === '408785106942164992') {
      async function sliceNumber(num) {
        const pattern = /\B(?=(\d{3})+(?!\d))/g
        return num.toString().replace(pattern, ',')
      }

      const msg = newmessage.content.split(' ')
      if (!newmessage.content) return
      else if (msg[7] === '**<@926643835419910184>**!')
        return newmessage.channel.send(
          `> <a:nhoamnhoam:1145729266517016606> cảm ơn bạn ${
            (msg[2]).replace('**', '')
          } đã donate cho bọn mình **_${
            sliceNumber(((msg[4]).replace('**', '')))
          }_ cowoncy** nha!`
        );
    }
  },
});
