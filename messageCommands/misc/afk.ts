import Folody from "Folody";
import { Message } from "discord.js";
import { MessageCommand } from "modules/command.js";

async function afkCommand(message: Message, ...reason: string[]) {
  const folody = message.client as Folody;

  if (await folody.db.get(`${message.author.id}.afk`)) {
    folody.db.delete(`${message.author.id}.afk`);
    return message.reply({ embeds: [{ description: "Đã xóa AFK của bạn", color: folody.branding.embedColor }] });
  }

  if (!reason) return message.reply({ embeds: [{ description: "Bạn phải nhập lí do AFK", color: folody.branding.embedColor }] });

  folody.db.set(`${message.author.id}.afk`, reason.join(" ") || "Không có lí do");
  return message.reply({ embeds: [{ description: "Đã set AFK của bạn", color: folody.branding.embedColor }] });
}

export default new MessageCommand({
  name: "afk",
  category: "misc",
  description: "Set or clear your AFK status",
  run: afkCommand,
});
