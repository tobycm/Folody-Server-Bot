import Folody from "Folody";
import { Events } from "discord.js";
import Event from "modules/event";
import { BaseExceptions, GuildExceptions } from "modules/exceptions";

export default new Event({
  eventName: Events.InteractionCreate,
  async run(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'tag_modal') {

    const folody = interaction.client as Folody;
    const tag = interaction.fields.getTextInputValue('tag_name');
	  const content = interaction.fields.getTextInputValue('tag_content');

    const customTags =
      (await folody.db.get<CustomTags>(
        `${interaction.guild!.id}.customTags`
      )) || {};

    customTags[tag] = { content, author: interaction.user.id };

    folody.db.set<CustomTags>(
      `${interaction.guild!.id}.customTags`,
      customTags
    );
    return interaction.reply({ content: `Đã tạo tag ${inlineCode(tag)} thành công!` });
    };
  },
});
