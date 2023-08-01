import { EmbedBuilder } from "@discordjs/builders";
import { inlineCode, Message } from "discord.js";
import Folody from "Folody";
import { MessageCommand } from "modules/command";
import { Optional } from "modules/usageArgumentTypes";

async function helpCommand(message: Message<true>) {
  const folody = message.client as Folody;

  const commandName = message.content.split(" ")[1];
  if (commandName) {
    const command = folody.messageCommands.get(commandName);
    if (!command) return message.reply("Command not found.");

    let commandUsage = "";

    const embed = new EmbedBuilder({
      title: inlineCode(
        (await folody.getPrefix(message.guild.id)) + command.name
      ),
      description: command.description,
      color: folody.branding.embedColor,
      fields: [
        {
          name: "Category",
          value: command.category ?? "None",
          inline: true,
        },
      ],
      footer: {
        text: `Requested by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL(),
      },
    });

    if (command.aliases.length > 0)
      embed.addFields([{ name: "Aliases", value: command.aliases.join(", ") }]);

    if (command.usage.length > 0)
      command.usage.forEach(
        (usage) =>
          (commandUsage += " " + usage.wrap[0] + usage.argument + usage.wrap[1])
      );
    embed.addFields([
      {
        name: "Usage",
        value: inlineCode(
          (await folody.getPrefix(message.guild.id)) +
            command.name +
            commandUsage
        ),
      },
    ]);

    return message.reply({ embeds: [embed] });
  }

  // const categories = new Set();
  // for (const command of folody.messageCommands.values())
  //     categories.add(command.category);

  message.reply({
    embeds: [
      {
        title: "Help",
        description: `Use \`${await folody.getPrefix(
          message.guild.id
        )}help <command>\` to get more information about a command.`,
        color: folody.branding.embedColor,
      },
    ],
  });
}

export default new MessageCommand({
  name: "help",
  category: "misc",
  description: "Shows help",
  usage: [Optional("command")],
  run: helpCommand,
});
