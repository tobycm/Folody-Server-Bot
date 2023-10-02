import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
} from "discord.js";

export function guildOnly(
  interaction: ChatInputCommandInteraction | AutocompleteInteraction
) {
  if (!interaction.guild) {
    if (interaction instanceof AutocompleteInteraction)
      interaction.respond([
        {
          name: "Lệnh này chỉ có thể chạy trong server thôi nhé :>",
          value: "guildOnly",
        },
      ]);
    else interaction.reply("Lệnh này chỉ có thể chạy trong server thôi nhé :>");
    return false;
  }

  return true;
}
