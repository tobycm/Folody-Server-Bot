import { AttachmentBuilder, Events } from "discord.js";
import { downloadOne } from "modules/TikTokDownloader";
import Event from "modules/event";

export default new Event({
  eventName: Events.MessageCreate,
  async run(message) {
    // ko bt regex có ổn ko
    const tiktokRegex =
      /(@[a-zA-z0-9]*|.*)(\/.*\/|trending.?shareId=)([\d]*)/gm;

    const matches = message.content.match(tiktokRegex);

    if (!matches) return;

    const id = matches[3];

    message.channel.send({
      files: [
        new AttachmentBuilder(await downloadOne(id), { name: `${id}.mp4` }),
      ],
    });
  },
  disabled: true,
});
