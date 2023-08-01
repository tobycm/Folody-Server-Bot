import { Message } from "discord.js";
import { MessageCommand } from "modules/command.js";

async function pingCommand(message: Message) {
  const replyMessage = await message.reply("Measuring ping...");
  replyMessage.edit(
    `Pong! \`${replyMessage.createdTimestamp - message.createdTimestamp}\`ms`
  );
}

export default new MessageCommand({
  name: "ping",
  aliases: ["pong"],
  category: "misc",
  description: "Pings the bot",
  run: pingCommand,
});
