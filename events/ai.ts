import { Events } from "discord.js";
import Folody from "Folody";
import BotEvent from "modules/event";

export default new BotEvent({
  event: Events.MessageCreate,
  async run(message) {
    if (message.author.bot) return;
    if (!message.inGuild()) return;

    if (!message.mentions.has(message.client.user)) return;

    const folody = message.client as Folody;

    if (!folody.ai) return;

    const allowedChannels = (await folody.db.get<string>(`${message.guild.id}.ai.channels`))?.split(",") || [];

    if (!allowedChannels.includes(message.channel.id)) return;

    await message.channel.sendTyping();

    const prompt =
      (await folody.db.get<string>(`${message.guild.id}.ai.prompt`)) ||
      `bạn là một trợ lý rất hữu ích. bạn là ${message.client}, bạn đang ở một server discord có thông tin là ${message.guild}, đây là message đã kêu gọi bạn: ${message}`;

    const completions = await folody.ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message.content },
      ],
    });

    message.reply({
      content: completions.choices[0].message.content ?? "có gì đó sai sai, bạn có thể thử lại không?",
      allowedMentions: { parse: ["users"] },
    });
  },
});
