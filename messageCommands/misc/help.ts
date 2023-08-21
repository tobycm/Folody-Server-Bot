import { EmbedBuilder } from "@discordjs/builders";
import { inlineCode, Message } from "discord.js";
import Folody from "Folody";
import { MessageCommand } from "modules/command";
import { Optional } from "modules/usageArgumentTypes";

async function helpCommand(message: Message, commandName?: string) {
  if (!message.guild) return;
  const folody = message.client as Folody;

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

  const categories = new Map<string, MessageCommand[]>();
  for (const command of folody.messageCommands.values()) {
    if (command.managerOnly || command.ownerOnly) continue;

    const category = command.category ?? "Uncategorized";
    if (!categories.has(category)) {
      categories.set(category, [command]);
      continue;
    }
    if (categories.get(category)?.find((c) => c.name === command.name))
      continue;
    categories.get(category)!.push(command);
  }

  const embed = new EmbedBuilder()
    .setAuthor({
      name: "Help",
      iconURL: folody.user!.displayAvatarURL(),
    })
    .setTitle("Help")
    .setColor(folody.branding.embedColor)
    .setFooter({
      text: `Requested by ${message.author.tag}`,
      iconURL: message.author.displayAvatarURL(),
    })
    .setTimestamp();

  for (const [category, commands] of categories) {
    embed.addFields({
      name: category,
      value: commands.map((command) => inlineCode(command.name)).join("\n"),
    });
  }

  message.reply({ embeds: [embed] });
}

export default new MessageCommand({
  name: "help",
  category: "misc",
  description: "Shows help",
  usage: [Optional("command")],
  run: helpCommand,
});
