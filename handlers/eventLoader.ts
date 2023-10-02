import { readdirSync } from "fs";

import Folody from "Folody";
import BotEvent from "modules/event";

const EVENT_DIR = "./events/"; // ko bỏ ./

export default async function loadEvents(folody: Folody) {
  readdirSync(EVENT_DIR).forEach(async (file) => {
    const clientEvent = (await import(`.${EVENT_DIR}${file}`))
      .default as BotEvent<any>;
    if (clientEvent.disabled) return;
    if (clientEvent.once) folody.once(clientEvent.event, clientEvent.run);
    else folody.on(clientEvent.event, clientEvent.run);
  });
}
