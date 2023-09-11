import Folody from "Folody";
import { Events, GuildMember, GuildTextBasedChannel } from "discord.js";
import Event from "modules/event";

async function onGuildMemberAdd(member: GuildMember) {
  const folody = member.client as Folody;

  const welcomeChannel = member.guild.channels.cache.get(
    (await folody.db.get<string>(`${member.guild.id}.channel.welcome`)) ??
      "955639718815621151"
  ) as GuildTextBasedChannel;

  if (!welcomeChannel) return;

  if (member.user.id === "867741983774212166") {
    welcomeChannel.send(
      `Có tên nào đấy vừa vào si vi nhưng do chúng tôi anti tên đấy nên bị đá đít luôn rồi :scream: :scream: :scream:`
    );
    member.ban();
    setTimeout(() => member.guild.members.unban("867741983774212166"), 5000);
  }
}

export default new Event({
  eventName: Events.GuildMemberAdd,
  run: onGuildMemberAdd,
});
