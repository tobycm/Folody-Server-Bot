import { ActionRowBuilder, ModalBuilder, PermissionFlagsBits, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { checkPermissions } from "modules/checks/access";
import { guildOnly } from "modules/checks/guild";
import { SlashCommand } from "modules/command";

export default new SlashCommand({
  data: new SlashCommandBuilder().setName("ai_prompt").setDescription("Đặt prompt cho AI"),
  checks: [guildOnly, checkPermissions([PermissionFlagsBits.ManageMessages])],
  async run(interaction) {
    const modal = new ModalBuilder().setCustomId("prompt_modal").setTitle("AI Prompt");

    const content = new TextInputBuilder()
      .setCustomId("ai_prompt")
      .setLabel("AI Prompt")
      .setPlaceholder("Nhập prompt cho AI")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(content);
    modal.addComponents(firstActionRow);

    return interaction.showModal(modal);
  },
});
