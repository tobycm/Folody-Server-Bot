import { AttachmentBuilder, Events } from "discord.js";
import { downloadOne } from "modules/TikTokDownloader";
import Event from "modules/event";

export default new Event({
  eventName: Events.MessageUpdate,
  async run(message) {
    if (!message.embeds[0]) return;
    if (!message.embeds[0].url) return;

    const tiktokRegex = /https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)/;

    const matches = message.embeds[0].url.match(tiktokRegex);
    if (!matches) return;

    message.channel.send({
      files: [
        new AttachmentBuilder(await downloadOne(message.embeds[0].url), {
          name: "tiktok.mp4",
        }),
      ],
    });
  },
});
