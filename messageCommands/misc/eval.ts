import { codeBlock, Message } from "discord.js";
import Folody from "Folody";
import { MessageCommand } from "modules/command";
import { Required } from "modules/usageArgumentTypes";
import { inspect } from "util";

async function evalCommand(message: Message<true>) {
  let code = message.content
    .slice(
      ((await (message.client as Folody).getPrefix(message.guild.id)) + "eval")
        .length
    )
    .trim();

  if (
    (code.startsWith("```js") && code.endsWith("```")) ||
    (code.startsWith("```ts") && code.endsWith("```"))
  )
    code = code.slice(5, -3);
  else if (code.startsWith("```") && code.endsWith("```"))
    code = code.slice(3, -3);

  let eval_result = await eval("async function run() {" + code + "}; run()");

  try {
    await message.reply(codeBlock("js", inspect(eval_result, false, 0)));
  } catch (error) {
    await message.reply(codeBlock("js", String(error)));
  }
}

export default new MessageCommand({
  name: "eval",
  category: "misc",
  description: "Eval code",
  usage: [Required("code")],
  ownerOnly: true,
  run: evalCommand,
});
