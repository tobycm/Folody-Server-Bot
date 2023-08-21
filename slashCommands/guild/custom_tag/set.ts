import Folody from "Folody";
import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "modules/command";
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
    const tag = interaction.options.getString("tag", true);
    const content = interaction.options.getString("content", true);

    if (!interaction.inGuild()) return;

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
