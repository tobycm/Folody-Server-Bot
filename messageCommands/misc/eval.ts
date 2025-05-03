import { codeBlock, Message } from "discord.js";
import Folody from "Folody";
import { checkOwner } from "modules/checks/access";
import { MessageCommand } from "modules/command";
import { bareStringify } from "modules/utils";
import { inspect } from "util";

async function evalCommand(message: Message) {
  const folody = message.client as Folody;

  let code = message.content.slice(((message.guild ? await folody.getPrefix(message.guild.id) : "f!") + "eval").length).trim();

  if ((code.startsWith("```js") && code.endsWith("```")) || (code.startsWith("```ts") && code.endsWith("```"))) code = code.slice(5, -3);
  else if (code.startsWith("```") && code.endsWith("```")) code = code.slice(3, -3);

  bareStringify;

  try {
    const eval_result = await eval("(async () =>{" + code + "})()");

    await message.reply(codeBlock("js", String(inspect(eval_result, false, 0)).replaceAll("`", "\\`")));
  } catch (error) {
    await message.reply(codeBlock("js", String(error).replaceAll("`", "\\`")));
  }
}

export default new MessageCommand({
  name: "eval",
  category: "misc",
  description: "Eval code",
  validate(message, ...code) {
    if (code.join(" ").trim() === "") {
      message.reply("Code đâu bủh");
      return false;
    }
    return true;
  },
  checks: [checkOwner],
  run: evalCommand,
});
