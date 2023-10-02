import Folody from "Folody";
import { Message, PermissionsBitField } from "discord.js";
import { GuildExceptions } from "modules/exceptions";

export function checkOwner(message: Message) {
  const folody = message.client as Folody;

  if (!folody.owners.includes(message.author.id))
    throw new GuildExceptions.NoPermissions();

  return true;
}

export function checkManager(message: Message) {
  const folody = message.client as Folody;

  if (!folody.managers.includes(message.author.id))
    throw new GuildExceptions.NoPermissions();

  return true;
}

export function checkManageGuild(message: Message<true>) {
  if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageGuild))
    throw new GuildExceptions.NoPermissions();

  return true;
}
