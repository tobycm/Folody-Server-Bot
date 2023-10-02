import { AttachmentBuilder, Events } from "discord.js";
import { downloadOne } from "modules/TikTokDownloader";
import BotEvent from "modules/event";

const tiktokRegex =
  /\bhttps?:\/\/(?:m|www|v.)\.tiktok\.com\/\S*?\b(?:(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+)|(?=\w{7})(\w*?[A-Z\d]\w*)(?=\s|\/$))\b/;

export default new BotEvent({
  event: Events.MessageUpdate,
  async run(message) {
    if (!message.embeds[0]) return;

    const url = message.embeds[0].url;

    if (!url) return;

    if (!url.match(tiktokRegex)) return;

    message.channel.send({
      files: [
        new AttachmentBuilder(await downloadOne(url), { name: "tiktok.mp4" }),
      ],
    });
  },
});
