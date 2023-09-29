import { AttachmentBuilder, Events } from "discord.js";
import { downloadOne } from "modules/TikTokDownloader";
import Event from "modules/event";

export default new Event({
  eventName: Events.MessageUpdate,
  async run(message) {
    const tiktokRegex =
      /^https:\/\/(www|v[a-z]{1}|[a-z])+\.(tiktok|tiktokv)\.com\/@?(\w.+)\//;

    const matches = message.embeds[0].url?.match(tiktokRegex);
    if (!matches) return;

    const id = matches[3];

    message.channel.send({
      files: [
        new AttachmentBuilder(await downloadOne(id), { name: `${id}.mp4` }),
      ],
    });
  },
});
