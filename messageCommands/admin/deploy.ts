import Folody from "Folody";
import { Message, SlashCommandBuilder } from "discord.js";
import { MessageCommand } from "modules/command";

// deploy slash commands
async function deployCommand(message: Message) {
  const folody = message.client as Folody;

  const guildID = message.content.split(" ")[1];

  const slashCommands: SlashCommandBuilder[] = [];
  folody.slashCommands.forEach((slashCommand) =>
    slashCommands.push(slashCommand.data)
  );

  if (guildID) {
    try {
      await folody.application?.commands.set(slashCommands, guildID);
    } catch (error) {
      return message.reply("Xin cái ID lmeo");
    }
  } else folody.application?.commands.set(slashCommands);

  message.reply("Đã deploy slash commands");
}

export default new MessageCommand({
  name: "deploy",
  category: "admin",
  description: "Deploy slash commands",
  ownerOnly: true,
  run: deployCommand,
});
