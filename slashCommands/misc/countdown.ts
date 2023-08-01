import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  formatEmoji,
  userMention,
} from "discord.js";
import { SlashCommand } from "modules/command";
import { secondsToTime } from "modules/utils";

function timeNumberToEmoji(time: string) {
  const emojiMap = {
    "0": ":zero:",
    "1": ":one:",
    "2": ":two:",
    "3": ":three:",
    "4": ":four:",
    "5": ":five:",
    "6": ":six:",
    "7": ":seven:",
    "8": ":eight:",
    "9": ":nine:",
    ":": " : ",
  };

  let emojiString = "";
  for (const character of time) {
    emojiString += emojiMap[character as keyof typeof emojiMap];
  }
  return emojiString;
}

async function countdownCommand(interaction: ChatInputCommandInteraction) {
  let time = interaction.options.getInteger("time", true);
  const message = interaction.options.getString("message", true);
  const user = interaction.options.getUser("user");

  if (time < 1)
    return interaction.reply("Đếm gì ít nhất cũng phải 1 giây chứ?");

  interaction.reply(
    timeNumberToEmoji(secondsToTime(time, true, true)) +
      formatEmoji("1100977419147542638", true)
  );
  time--;

  const counter = setInterval(async () => {
    if (time === 0) {
      clearInterval(counter);
      interaction.editReply("Đếm xong rồi nè!");
      return interaction.followUp(
        `${user ? `${userMention(user.id)} ` : ""}${message}`
      );
    }

    interaction.editReply(
      timeNumberToEmoji(secondsToTime(time, true, true)) +
        formatEmoji("1100977419147542638", true)
    );
    time--;
  }, 1000);
}

async function countdownCommandCompletion(
  interaction: AutocompleteInteraction
) {
  const time = interaction.options.getInteger("time", true);
  try {
    return interaction.respond([
      {
        name: secondsToTime(time, true, true),
        value: time,
      },
    ]);
  } catch {}
}

const data = new SlashCommandBuilder()
  .setName("countdown")
  .setDescription("Starts a countdown");

data
  .addIntegerOption((option) =>
    option
      .setName("time")
      .setDescription("Time in seconds")
      .setRequired(true)
      .setAutocomplete(true)
  )
  .addStringOption((option) =>
    option
      .setName("message")
      .setDescription("Message to send when countdown ends")
      .setRequired(true)
  )
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("User to ping when countdown ends")
      .setRequired(false)
  );

export default new SlashCommand({
  data: data,
  run: countdownCommand,
  completion: countdownCommandCompletion,
});
