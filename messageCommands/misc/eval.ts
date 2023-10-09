import { codeBlock, Message } from "discord.js";
import Folody from "Folody";
import { checkOwner } from "modules/checks/access";
import { MessageCommand } from "modules/command";
import { inspect } from "util";

async function evalCommand(message: Message<true>) {
  let code = message.content.slice(((await (message.client as Folody).getPrefix(message.guild.id)) + "eval").length).trim();

  if ((code.startsWith("```js") && code.endsWith("```")) || (code.startsWith("```ts") && code.endsWith("```"))) code = code.slice(5, -3);
  else if (code.startsWith("```") && code.endsWith("```")) code = code.slice(3, -3);

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
