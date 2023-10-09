import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";

export function guildOnly(interaction: ChatInputCommandInteraction | AutocompleteInteraction) {
  if (!interaction.inGuild()) {
    if (interaction.isAutocomplete()) interaction.respond([]);
    else interaction.reply("Lệnh này chỉ có thể chạy trong server thôi nhé :>");
    return false;
  }

  return true;
}
