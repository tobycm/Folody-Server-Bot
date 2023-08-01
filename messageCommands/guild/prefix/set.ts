import Folody from "Folody";
import { Message, PermissionFlagsBits, inlineCode } from "discord.js";
import { MessageCommand } from "modules/command";
import { BaseExceptions, GuildExceptions } from "modules/exceptions";
import { Required } from "modules/usageArgumentTypes";

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
  usage: [Required("prefix")],
  aliases: ["setprefix", "prefix", "set-prefix"],
  run: setPrefixCommand,
});
