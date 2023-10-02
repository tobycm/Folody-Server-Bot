import Folody from "Folody";
import CustomTags from "database/models/customTags";
import {
  PermissionFlagsBits,
  SlashCommandBuilder,
  inlineCode,
} from "discord.js";
import { checkPermissions } from "modules/checks/access";
import { guildOnly } from "modules/checks/guild";
import { SlashCommand } from "modules/command";

const data = new SlashCommandBuilder()
  .setName("delete_custom_tag")
  .setDescription("Delete a custom tag");

data.addStringOption((option) =>
  option.setName("tag").setDescription("Tag name").setRequired(true)
);

export default new SlashCommand({
  data,
  checks: [guildOnly, checkPermissions([PermissionFlagsBits.ManageMessages])],
  async run(interaction) {
    const folody = interaction.client as Folody;

    const customTags =
      (await folody.db.get<CustomTags>(
        `${interaction.guild!.id}.customTags`
      )) || {};

    const tag = interaction.options.getString("tag", true);

    if (!customTags[tag]) {
      return interaction.reply(`Tag ${tag} không tồn tại!`);
    }

    delete customTags[tag];

    folody.db.set<CustomTags>(
      `${interaction.guild!.id}.customTags`,
      customTags
    );

    interaction.reply(`Đã xóa tag ${inlineCode(tag)} thành công!`);
  },
});
