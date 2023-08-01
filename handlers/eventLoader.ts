import { readdirSync } from "fs";

import Folody from "Folody";
import Event from "modules/event";

const EVENT_DIR = "./events/"; // ko bỏ ./

export default async function loadEvents(folody: Folody) {
  readdirSync(EVENT_DIR).forEach(async (file) => {
    const clientEvent = (await import(`.${EVENT_DIR}${file}`))
      .default as Event<any>;
    if (clientEvent.disabled) return;
    if (clientEvent.once) folody.once(clientEvent.eventName, clientEvent.run);
    else folody.on(clientEvent.eventName, clientEvent.run);
  });
}
