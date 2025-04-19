import Folody from "Folody";
import { AutocompleteInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { checkPermissions } from "modules/checks/access";
import { guildOnly } from "modules/checks/guild";
import { SlashCommand } from "modules/command";
import { secondsToTime } from "modules/utils";

const data = new SlashCommandBuilder().setName("set_custom_tag_cooldown").setDescription("Set custom tag cooldown");

data.addIntegerOption((option) =>
  option.setName("cooldown").setDescription("Server custom tag cooldown (in ms)").setRequired(true).setMinValue(1000).setAutocomplete(true),
);

export default new SlashCommand({
  data,
  checks: [guildOnly, checkPermissions([PermissionFlagsBits.ManageMessages])],
  async run(interaction) {
    const folody = interaction.client as Folody;

    const cooldown = interaction.options.getInteger("cooldown", true);

    folody.db.set<number>(`${interaction.guild!.id}.customTag.cooldown`, cooldown);
    interaction.reply(`Đã đặt cooldown cho custom tag là ${secondsToTime(cooldown, true, true)} (${cooldown}ms)`);
  },
  async completion(interaction: AutocompleteInteraction) {
    const cooldown = interaction.options.getInteger("cooldown", true);
    try {
      return interaction.respond([{ name: secondsToTime(cooldown, true, true), value: cooldown }]);
    } catch {}
  },
});
