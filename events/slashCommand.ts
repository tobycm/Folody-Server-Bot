import Folody from "Folody";
import { Events } from "discord.js";
import Event from "modules/event";
import { BaseExceptions, GuildExceptions } from "modules/exceptions";

export default new Event({
  eventName: Events.InteractionCreate,
  async run(interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isAutocomplete())
      return;

    if (interaction.user.bot) return;

    const folody = interaction.client as Folody;
    const command = folody.slashCommands.get(interaction.commandName);

    if (!command) return;

    if (command.disabled) {
      if (interaction.isAutocomplete())
        return interaction.respond([
          {
            name: "Lệnh này đã bị tắt",
            value: "Lệnh này đã bị tắt",
          },
        ]);

      if (!folody.owners.includes(interaction.user.id)) {
        if (command.ownerOnly) throw new GuildExceptions.NoPermissions();
        if (
          !folody.managers.includes(interaction.user.id) &&
          command.managerOnly
        )
          throw new GuildExceptions.NoPermissions();
      }

      return interaction.reply("Lệnh này đã bị tắt");
    }

    if (interaction.isAutocomplete()) {
      if (!command.completion) return;

      if (!folody.owners.includes(interaction.user.id)) {
        if (command.ownerOnly) return;
        if (
          !folody.managers.includes(interaction.user.id) &&
          command.managerOnly
        )
          return;
      }

      try {
        await command.completion(interaction);
      } catch (error) {
        folody.reportError(error as Error);
      }
    }

    if (interaction.isChatInputCommand()) {
      if (!folody.owners.includes(interaction.user.id)) {
        if (command.ownerOnly) throw new GuildExceptions.NoPermissions();
        if (
          !folody.managers.includes(interaction.user.id) &&
          command.managerOnly
        )
          throw new GuildExceptions.NoPermissions();
      }

      try {
        await command.run(interaction);
      } catch (error) {
        if (error instanceof BaseExceptions.UserError)
          return interaction.reply(error.message);

        if (!interaction.replied)
          interaction.reply("Có lỗi xảy ra khi chạy lệnh này :<");
        else interaction.followUp("Có lỗi xảy ra khi chạy lệnh này :<");
        folody.reportError(error as Error);
      }
    }
  },
});
