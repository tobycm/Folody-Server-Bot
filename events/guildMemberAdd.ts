import Folody from "Folody";
import {
  Events,
  GuildMember,
  GuildTextBasedChannel,
  userMention,
} from "discord.js";
import Event from "modules/event";

async function onGuildMemberAdd(member: GuildMember) {
  const folody = member.client as Folody;

  const welcomeChannel = member.guild.channels.cache.get(
    (await folody.db.get<string>(`${member.guild.id}.channel.welcome`)) ??
      "955639718815621151"
  ) as GuildTextBasedChannel;

  if (!welcomeChannel) return;
  await welcomeChannel.send({
    content: `Wassup ${userMention(member.id)}!`,
  });
}

export default new Event({
  eventName: Events.GuildMemberAdd,
  run: onGuildMemberAdd,
});
