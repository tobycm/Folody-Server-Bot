import Folody from "Folody.js";
import {
  Events,
  ThreadChannel,
  codeBlock,
  inlineCode,
  userMention,
} from "discord.js";
import Event from "modules/event.js";
import { BaseExceptions, GuildExceptions } from "modules/exceptions/index.js";

export default new Event({
  eventName: Events.MessageCreate,
  async run(message) {
    if (message.author.bot) return;
    if (!message.inGuild()) return;
    if (!message.channel.isTextBased()) return;

    const folody = message.client as Folody;
    folody.user = folody.user!;

    const prefix = await folody.getPrefix(message.guild.id);

    if (message.content == userMention(folody.user.id))
      return message.reply(
        `Prefix của bot là ${inlineCode(
          await folody.getPrefix(message.guild.id)
        )} nhé :>`
      );

    if (
      !message.content.startsWith(prefix) &&
      !message.content.startsWith(userMention(folody.user.id))
    )
      return;

    const [commandName, ...args] = message.content
      .slice(
        message.content.startsWith(prefix)
          ? prefix.length
          : userMention(folody.user.id).length
      )
      .trim()
      .split(/ +/g);

    if (!commandName) return;

    const command = folody.messageCommands.get(commandName);
    if (!command) return;

    if (command.disabled) {
      if (!folody.owners.includes(message.author.id)) {
        if (command.ownerOnly) throw new GuildExceptions.NoPermissions();
        if (!folody.managers.includes(message.author.id) && command.managerOnly)
          throw new GuildExceptions.NoPermissions();
      }

      return message.reply("Lệnh này đã bị tắt");
    }

    if (!folody.owners.includes(message.author.id)) {
      if (command.ownerOnly) throw new GuildExceptions.NoPermissions();
      if (!folody.managers.includes(message.author.id) && command.managerOnly)
        throw new GuildExceptions.NoPermissions();
    }

    if (!(message.channel instanceof ThreadChannel))
      if (command.nsfw && !message.channel.nsfw)
        return message.reply(
          "Đi qua cái channel nsfw sú sú kia rồi mới dùng lệnh này nhé :>"
        );

    try {
      await command.run(message, ...args);
    } catch (error) {
      if (error instanceof BaseExceptions.UserInputError) {
        const commandUsage = command.usage.join(" ");
        return message.reply({
          embeds: [
            {
              author: {
                name: "Thiếu tham số",
                icon_url: folody.user.displayAvatarURL(),
              },
              description:
                codeBlock(
                  `${prefix}${command.name} ${commandUsage}\n` +
                    " ".repeat(
                      `${prefix}${command.name} `.length +
                        commandUsage.indexOf(error.parameter)
                    ) +
                    "^".repeat(error.parameter.length)
                ) + `Thiếu tham số ${inlineCode(error.parameter)}`,
              color: folody.branding.embedColor,
            },
          ],
        });
      }

      if (error instanceof BaseExceptions.UserError)
        return message.reply(error.message);

      message.reply("Có lỗi xảy ra khi chạy lệnh này :<");
      folody.reportError(error as Error);
    }
  },
});
