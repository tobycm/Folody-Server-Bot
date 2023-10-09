import Folody from "Folody";
import { Message, PermissionFlagsBits, inlineCode } from "discord.js";
import { checkPermissions } from "modules/checks/access";
import { MessageCommand } from "modules/command";

export default new MessageCommand({
  name: "set_prefix",
  description: "Set the prefix for the guild",
  category: "guild",
  aliases: ["setprefix", "prefix", "set-prefix"],
  checks: [checkPermissions([PermissionFlagsBits.ManageGuild])],
  validate(message, prefix) {
    if (prefix) return true;

    message.reply("Xin cái prefix 🙏");
    return false;
  },
  async run(message: Message<true>, prefix: string) {
    (message.client as Folody).setPrefix(message.guild.id, prefix);

    return message.channel.send(`Prefix set to ${inlineCode(prefix)}`);
  },
});
