import { Message } from "discord.js";

export function checkNSFW(message: Message<true>) {
  if (!("nsfw" in message.channel)) return false; // bủh

  const nsfw = message.channel.nsfw;

  if (!nsfw)
    message.reply(
      "Đi qua cái channel nsfw sú sú kia rồi mới dùng lệnh này nhé :>"
    );

  return nsfw;
}
