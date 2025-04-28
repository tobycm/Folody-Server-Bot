import { AttachmentBuilder, Events } from "discord.js";
import { downloadOne } from "modules/TikTokDownloader";
import BotEvent from "modules/event";

const tiktokRegex =
  /https:\/\/(?:m|www|vm|vt|lite)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video|photo)\/|\?shareId=|\&item_id=)(\d+))|\w+)/;

export default new BotEvent({
  event: Events.MessageUpdate,
  async run(message) {
    if (!message.embeds[0]) return;

    const url = message.embeds[0].url;

    if (!url) return;

    if (!url.match(tiktokRegex)) return;

    message.channel.send({ files: [new AttachmentBuilder(await downloadOne(url), { name: "tiktok.mp4" })] });
  },
});
