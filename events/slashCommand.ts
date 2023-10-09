import Folody from "Folody";
import { Events } from "discord.js";
import BotEvent from "modules/event";
import { UserError } from "modules/exceptions/base";

export default new BotEvent({
  event: Events.InteractionCreate,
  async run(interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isAutocomplete()) return;

    if (interaction.user.bot) return;

    const folody = interaction.client as Folody;
    const command = folody.slashCommands.get(interaction.commandName);

    if (!command) return;

    if (command.disabled) {
      if (interaction.isAutocomplete()) return interaction.respond([]);

      return interaction.reply("Lệnh này đã bị tắt");
    }

    if (interaction.isAutocomplete()) {
      if (!command.completion) return;

      for (const check of command.checks) {
        try {
          const ok = await check(interaction);
          if (!ok) return;
        } catch (error) {
          if (error instanceof UserError)
            return interaction.respond([
              {
                name: error.message,
                value: error.message,
              },
            ]);
          folody.reportError(error as Error);
        }
      }

      try {
        await command.completion(interaction);
      } catch (error) {
        folody.reportError(error as Error);
      }
    }

    if (interaction.isChatInputCommand()) {
      for (const check of command.checks) {
        try {
          const ok = await check(interaction);
          if (!ok) return;
        } catch (error) {
          if (error instanceof UserError) return interaction.reply(error.message);
        }
      }

      try {
        await command.run(interaction);
      } catch (error) {
        if (error instanceof UserError) return interaction.reply(error.message);

        if (!interaction.replied) interaction.reply("Có lỗi xảy ra khi chạy lệnh này :<");
        else interaction.followUp("Có lỗi xảy ra khi chạy lệnh này :<");
        folody.reportError(error as Error);
      }
    }
  },
});
