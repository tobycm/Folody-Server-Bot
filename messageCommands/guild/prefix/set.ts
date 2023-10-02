import Folody from "Folody";
import { Message, PermissionFlagsBits, inlineCode } from "discord.js";
import { checkManageGuild } from "modules/checks/access";
import { MessageCommand } from "modules/command";
import { BaseExceptions, GuildExceptions } from "modules/exceptions";

async function setPrefixCommand(message: Message<true>, prefix?: string) {
  if (message.member?.permissions.has(PermissionFlagsBits.ManageGuild))
    throw new GuildExceptions.NoPermissions();

  if (!prefix) throw new BaseExceptions.UserInputError("prefix");

  (message.client as Folody).setPrefix(message.guild.id, prefix);

  return message.channel.send(`Prefix set to ${inlineCode(prefix)}`);
}

export default new MessageCommand({
  name: "set_prefix",
  description: "Set the prefix for the guild",
  category: "guild",
  aliases: ["setprefix", "prefix", "set-prefix"],
  checks: [checkManageGuild],
  validate(message, prefix) {
    if (prefix) {
      return true;
    }

    message.reply("Xin cái prefix 🙏");
    return false;
  },
  run: setPrefixCommand,
});
