import { ActionRowBuilder, ModalBuilder, PermissionFlagsBits, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { checkPermissions } from "modules/checks/access";
import { guildOnly } from "modules/checks/guild";
import { SlashCommand } from "modules/command";

export default new SlashCommand({
  data: new SlashCommandBuilder().setName("custom_tag").setDescription("Custom tag command"),
  checks: [guildOnly, checkPermissions([PermissionFlagsBits.ManageMessages])],
  async run(interaction) {
    const modal = new ModalBuilder().setCustomId("tag_modal").setTitle("Custom tag");

    const name = new TextInputBuilder()
      .setCustomId("tag_name")
      .setLabel("Tag name")
      .setPlaceholder("Tag name")
      .setRequired(true)
      .setStyle(TextInputStyle.Short)
      .setMinLength(3)
      .setMaxLength(100);

    const content = new TextInputBuilder()
      .setCustomId("tag_content")
      .setLabel("Tag content")
      .setPlaceholder("Tag content")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(name);
    const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(content);
    modal.addComponents(firstActionRow, secondActionRow);

    return interaction.showModal(modal);
  },
});
