import Folody from "Folody";
import {
  GuildMember,
  PermissionFlagsBits,
  SlashCommandBuilder,
  inlineCode,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from "discord.js";
import { SlashCommand } from "modules/command";
import { NoPermissions } from "modules/exceptions/guild";
import CustomTags from "modules/models/customTags";

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
			.setCustomId('tag_modal')
			.setTitle('Custom tag');

    const name = new TextInputBuilder()
      .setCustomId('tag_name')
      .setLabel("Tag name")
	    .setPlaceholder('Tag name')
	    .setRequired(true);
      .setMaxLength(100)
      .setMinLength(3)

    const content = new TextInputBuilder()
      .setCustomId('tag_content')
      .setLabel("Tag content")
	    .setPlaceholder('Tag content')
	    .setRequired(true);
      .setStyle(TextInputStyle.Paragraph);

    const firstActionRow = new ActionRowBuilder().addComponents(name);
		const secondActionRow = new ActionRowBuilder().addComponents(content);
    modal.addComponents(firstActionRow, secondActionRow);

    return interaction.showModal(modal);
  },
});
