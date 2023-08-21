import Folody from "Folody";
import {
  EmbedBuilder,
  SlashCommandBuilder,
  codeBlock,
  inlineCode,
} from "discord.js";
import { SlashCommand } from "modules/command";
import CustomTags from "modules/models/custom_tags";

export default new SlashCommand({
  data: new SlashCommandBuilder()
    .setName("list_custom_tag")
    .setDescription("List custom tags command"),
  async run(interaction) {
    if (!interaction.inGuild()) return;

    const folody = interaction.client as Folody;

    const customTags =
      (await folody.db.get<CustomTags>(
        `${interaction.guild!.id}.customTags`
      )) || {};

    if (Object.keys(customTags).length === 0) {
      return interaction.reply("Không có custom tag nào trong server này!");
    }

    const embed = new EmbedBuilder().setTitle("Custom tags");

    for (const [tag, { content }] of Object.entries(customTags)) {
      embed.addFields({
        name: inlineCode(tag) + ":",
        value: codeBlock(content),
      });
    }

    interaction.reply({ embeds: [embed] });
  },
});
