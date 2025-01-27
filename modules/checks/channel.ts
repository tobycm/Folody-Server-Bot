import { AutocompleteInteraction, ChatInputCommandInteraction, Message } from "discord.js";

export function checkNSFW(message: Message<true> | ChatInputCommandInteraction | AutocompleteInteraction) {
  if (!message.channel) return false;
  if (!("nsfw" in message.channel)) return false; // bủh

  const nsfw = message.channel.nsfw;

  if (!nsfw) {
    if (message instanceof AutocompleteInteraction) message.respond([]);
    else message.reply("Đi qua cái channel <#1207705417615151184> sú sú kia rồi mới dùng lệnh này nhé :>");
  }

  return nsfw;
}
