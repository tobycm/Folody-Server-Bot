import Folody from "Folody";
import {
  GuildMember,
  PermissionFlagsBits,
  SlashCommandBuilder,
  inlineCode,
} from "discord.js";
import { SlashCommand } from "modules/command";
import { NoPermissions } from "modules/exceptions/guild";
import CustomTags from "modules/models/customTags";

const data = new SlashCommandBuilder()
  .setName("delete_custom_tag")
  .setDescription("Delete a custom tag");

data.addStringOption((option) =>
  option.setName("tag").setDescription("Tag name").setRequired(true)
);

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
