import { Events, User } from "discord.js";
import Folody from "Folody";
import BotEvent from "modules/event";
import { bareStringify, sleep } from "modules/utils";

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
      `bạn là một trợ lý rất hữu ích. bạn là ${bareStringify(message.client)}, bạn đang ở một server discord có thông tin là ${bareStringify(message.guild)}, đây là message đã kêu gọi bạn: ${bareStringify(message)}`;

    const history = Array.from(message.channel.messages.cache.values())
      .slice(-28)
      .sort((a, b) => a.createdTimestamp - b.createdTimestamp);

    const relatedMembers = new Set<User>();
    for (const msg of history) {
      if (msg.author.id === message.author.id) continue;
      relatedMembers.add(msg.author);
    }

    const completions = await folody.ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            prompt +
            `You are ${bareStringify(message.client)}, this message will provide a lot of information about your environment: ${bareStringify(message, 5)}` +
            `\n\nChannel history: ${history.map((msg) => bareStringify({ author: msg.author, content: msg.content })).join("\n")}` +
            `\n\nRelated members: ${Array.from(relatedMembers)
              .map((user) => bareStringify(user))
              .join(", ")}`,
        },
        { role: "user", content: message.content },
      ],
    });

    if (!completions.choices[0].message.content) {
      return message.reply("có gì đó sai sai, bạn có thể thử lại không?");
    }

    const parts: string[] = [];
    let currentPart = "";

    for (const part of completions.choices[0].message.content.split("\n")) {
      if (currentPart.length + part.length > 2000) {
        parts.push(currentPart);
        currentPart = "";
      }
      currentPart += part + "\n";
    }

    if (currentPart) {
      parts.push(currentPart);
    }

    for (const part of parts) {
      message.reply({
        content: part,
        allowedMentions: { parse: ["users"] },
      });

      await sleep(1000);
    }
  },
});
