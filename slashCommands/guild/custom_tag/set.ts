import {
  ActionRowBuilder,
  GuildMember,
  ModalBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { SlashCommand } from "modules/command";
import { NoPermissions } from "modules/exceptions/guild";

const data = new SlashCommandBuilder()
  .setName("custom_tag")
  .setDescription("Custom tag command");

export default new SlashCommand({
  data,
  async run(interaction) {
    if (!interaction.inGuild()) return;
    if (
      !(interaction.member as GuildMember).permissions.has(
        PermissionFlagsBits.ManageMessages
      )
    )
      throw new NoPermissions();

    const modal = new ModalBuilder()
      .setCustomId("tag_modal")
      .setTitle("Custom tag");

    const name = new TextInputBuilder()
      .setCustomId("tag_name")
      .setLabel("Tag name")
      .setPlaceholder("Tag name")
      .setRequired(true)
      .setMinLength(3)
      .setMaxLength(100);

    const content = new TextInputBuilder()
      .setCustomId("tag_content")
      .setLabel("Tag content")
      .setPlaceholder("Tag content")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    console.log(name.toJSON(), content.toJSON());

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(name);
    const secondActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(content);
    modal.addComponents(firstActionRow, secondActionRow);

    return interaction.showModal(modal);
  },
});
