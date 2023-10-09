import Folody from "Folody.js";
import { Events, inlineCode, userMention } from "discord.js";
import BotEvent from "modules/event.js";
import { UserError } from "modules/exceptions/base";

export default new BotEvent({
  event: Events.MessageCreate,
  async run(message) {
    if (message.author.bot) return;
    if (!message.inGuild()) return;
    if (!message.channel.isTextBased()) return;

    const folody = message.client as Folody;
    folody.user = folody.user!;

    const prefix = await folody.getPrefix(message.guild.id);

    if (message.content == userMention(folody.user.id))
      return message.reply(`Prefix của bot là ${inlineCode(await folody.getPrefix(message.guild.id))} nhé :>`);

    if (!message.content.startsWith(prefix) && !message.content.startsWith(userMention(folody.user.id))) return;

    const [commandName, ...args] = message.content
      .slice(message.content.startsWith(prefix) ? prefix.length : userMention(folody.user.id).length)
      .trim()
      .split(/ +/g);

    if (!commandName) return;

    const command = folody.messageCommands.get(commandName);
    if (!command) return;

    if (command.disabled) return message.reply("Lệnh này đã bị tắt");

    for (const check of command.checks) {
      try {
        const ok = await check(message);
        if (!ok) return;
      } catch (error) {
        if (error instanceof UserError) return message.reply(error.message);
      }
    }

    try {
      await command.run(message, ...args);
    } catch (error) {
      if (error instanceof UserError) return message.reply(error.message);

      message.reply("Có lỗi đã xảy ra khi chạy lệnh này :<");
      folody.reportError(error as Error);
    }
  },
});
