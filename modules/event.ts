import { ClientEvents } from "discord.js";

interface BotEventOptions<Event extends keyof ClientEvents> {
  disabled?: boolean;
  event: Event;
  once?: boolean;
  run: (...args: ClientEvents[Event]) => Promise<any>;
}

export default class BotEvent<Event extends keyof ClientEvents> {
  constructor(options: BotEventOptions<Event>) {
    this.disabled = options.disabled ?? false;
    this.event = options.event;
    this.once = options.once;
    this.run = options.run;
  }

  disabled;
  event;
  once?;
  run;
}
