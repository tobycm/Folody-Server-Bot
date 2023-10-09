import Folody from "Folody";
import { AutocompleteInteraction, ChatInputCommandInteraction, Message, PermissionResolvable } from "discord.js";
import { NoPermissions } from "modules/exceptions/guild";

export function checkOwner(message: Message | ChatInputCommandInteraction | AutocompleteInteraction) {
  const folody = message.client as Folody;

  const id = message instanceof Message ? message.author.id : message.user.id;

  if (!folody.owners.includes(id)) throw new NoPermissions();

  return true;
}

export function checkManager(message: Message | ChatInputCommandInteraction | AutocompleteInteraction) {
  const folody = message.client as Folody;

  const id = message instanceof Message ? message.author.id : message.user.id;

  if (!folody.managers.includes(id)) throw new NoPermissions();

  return true;
}

export function checkPermissions(permissions: PermissionResolvable[]) {
  return (message: Message<true> | ChatInputCommandInteraction | AutocompleteInteraction) => {
    if (!(message instanceof Message ? message.member?.permissions : message.memberPermissions)?.has(permissions)) throw new NoPermissions();

    return true;
  };
}
