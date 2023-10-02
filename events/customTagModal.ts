import Folody from "Folody";
import { Events, inlineCode } from "discord.js";
import BotEvent from "modules/event";
import CustomTags from "modules/models/customTags";

export default new BotEvent({
  event: Events.InteractionCreate,
  async run(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "tag_modal") {
      const folody = interaction.client as Folody;
      const tag = interaction.fields.getTextInputValue("tag_name");
      const content = interaction.fields.getTextInputValue("tag_content");

      const customTags =
        (await folody.db.get<CustomTags>(
          `${interaction.guild!.id}.customTags`
        )) || {};

      customTags[tag] = { content, author: interaction.user.id };

      folody.db.set<CustomTags>(
        `${interaction.guild!.id}.customTags`,
        customTags
      );
      return interaction.reply({
        content: `Đã tạo tag ${inlineCode(tag)} thành công!`,
      });
    }
  },
});
