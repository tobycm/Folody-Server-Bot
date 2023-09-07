import Folody from "Folody";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  GuildMember,
  PermissionFlagsBits,
  SlashCommandBuilder,
  codeBlock,
  inlineCode,
} from "discord.js";
import { SlashCommand } from "modules/command";
import { NoPermissions } from "modules/exceptions/guild";
import CustomTags from "modules/models/customTags";

export default new SlashCommand({
  data: new SlashCommandBuilder()
    .setName("list_custom_tag")
    .setDescription("List custom tags command"),
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

    if (Object.keys(customTags).length === 0) {
      return interaction.reply("Không có custom tag nào trong server này!");
    }

    const embeds: EmbedBuilder[] = [];

    let embed = new EmbedBuilder().setTitle("Custom tags");

    let fields = 0;

    for (const [tag, { content }] of Object.entries(customTags)) {
      if (fields === 20 || embed.length + tag.length + content.length > 6000) {
        embeds.push(embed);
        embed = new EmbedBuilder().setTitle("Custom tags");
        fields = 0;
      }

      embed.addFields({
        name: inlineCode(tag) + ":",
        value: codeBlock(content.slice(0, 1000)),
      });
      fields++;
    }

    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setLabel("Previous")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("next")
        .setLabel("Next")
        .setStyle(ButtonStyle.Primary)
    );

    let current = 0;

    (
      await interaction.reply({
        content: `Trang ${current + 1} / ${embeds.length}`,
        embeds: [embeds[0]],
        components: embeds.length > 1 ? [actionRow] : [],
      })
    )
      .createMessageComponentCollector({
        filter: (itr) =>
          itr.user.id === interaction.user.id &&
          ["next", "previous"].includes(itr.customId),
        time: 60000,
      })
      .on("collect", async (itr) => {
        if (itr.customId === "next") {
          if (current == embeds.length - 1) {
            itr.reply({ content: "Có gì để next đâu bro", ephemeral: true });
            return;
          }
          current++;
        }
        if (itr.customId === "previous") {
          if (current == 0) {
            itr.reply({
              content: "Có gì để quay lại đâu bro",
              ephemeral: true,
            });
            return;
          }
          current--;
        }
        interaction.editReply({
          content: `Trang ${current + 1} / ${embeds.length}`,
          embeds: [embeds[current]],
        });
        itr.reply({ content: "👌", ephemeral: true });
      });
  },
});
