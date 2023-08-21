import Folody from "Folody";
import {
  GuildMember,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "modules/command";
import { NoPermissions } from "modules/exceptions/guild";
import CustomTags from "modules/models/custom_tags";

const data = new SlashCommandBuilder()
  .setName("custom_tag")
  .setDescription("Custom tag command");

data
  .addStringOption((option) =>
    option.setName("tag").setDescription("Tag name").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("content").setDescription("Tag content").setRequired(true)
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

    const tag = interaction.options.getString("tag", true);
    const content = interaction.options.getString("content", true);

    const folody = interaction.client as Folody;

    const customTags =
      (await folody.db.get<CustomTags>(
        `${interaction.guild!.id}.customTags`
      )) || {};

    customTags[tag] = { content, author: interaction.user.id };

    folody.db.set<CustomTags>(
      `${interaction.guild!.id}.customTags`,
      customTags
    );

    interaction.reply(`Đã tạo tag ${tag} thành công!`);
  },
});
