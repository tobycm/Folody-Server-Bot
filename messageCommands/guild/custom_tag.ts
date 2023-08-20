import Folody from "Folody";
import { inlineCode } from "discord.js";
import { MessageCommand } from "modules/command";
import CustomTags from "modules/models/custom_tags";

export default new MessageCommand({
  name: "custom_tag",
  aliases: ["ct"],
  description: "Custom tag command",
  async run(message, ...content) {
    if (content.length < 2) {
      return message.channel.send("Usage: `custom_tag <tag> ||| <content>`");
    }

    const [tag, ...rest] = content.join(" ").split("|||");

    if (!message.inGuild()) return;

    const folody = message.client as Folody;

    const customTags =
      (await folody.db.get<CustomTags>(`${message.guild.id}.customTags`)) || {};

    customTags[tag] = {
      content: rest.join(" "),
      author: message.author.id,
    };

    folody.db.set(`${message.guild.id}.customTags`, customTags);

    message.channel.send(`Đã tạo tag ${inlineCode(tag)} thành công!`);
  },
});
