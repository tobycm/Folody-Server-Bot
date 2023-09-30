import { AttachmentBuilder, Events } from "discord.js";
import { downloadOne } from "modules/TikTokDownloader";
import Event from "modules/event";

const tiktokRegex =
  /^https:\/\/(www|v[a-z]{1}|[a-z])+\.(tiktok|tiktokv)\.com\/@?(\w.+)\//;

export default new Event({
  eventName: Events.MessageUpdate,
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
