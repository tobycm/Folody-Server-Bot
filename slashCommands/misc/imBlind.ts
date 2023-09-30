import Folody from "Folody";
import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "modules/command";

export default new SlashCommand({
  data: new SlashCommandBuilder()
    .setName("im_blind")
    .setDescription("Nghỉ mắt cùng toby nào xd"),
  async run(interaction) {
    const folody = interaction.client as Folody;

    if (await folody.db.get<boolean>(`${interaction.user.id}.imBlind`)) {
      await folody.db.delete(`${interaction.user.id}.imBlind`);
      return interaction.reply("Đã xóa bạn ra khỏi danh sách nhắc nhở");
    }

    await folody.db.set<boolean>(`${interaction.user.id}.imBlind`, true);
    interaction.reply(
      "Nghỉ mắt mỗi 20 phút nhé :), nhìn ra ngoài xa 20m trong 20 giây nhe"
    );
  },
});
