import Folody from "Folody";
import {
  AttachmentBuilder,
  Events,
  GuildMember,
  GuildTextBasedChannel,
} from "discord.js";
import Event from "modules/event";
import WelcomeCard from "modules/images/welcome";

async function onGuildMemberAdd(member: GuildMember) {
  const folody = member.client as Folody;

  const welcomeChannel = member.guild.channels.cache.get(
    (await folody.db.get<string>(`${member.guild.id}.channel.welcome`)) ??
      "955639718815621151"
  ) as GuildTextBasedChannel;

  if (!welcomeChannel) return;
  await welcomeChannel.send({
    content:
      `Chào mừng ${member.user}!\n` +
      `Bạn là thành viên thứ ${member.guild.memberCount} của server!\n` +
      "Chúc bạn có trải nhiệm tuyệt vời tại đây",
    files: [
      new AttachmentBuilder(await WelcomeCard(member), {
        name: "welcome.png",
        description: `Welcome ${member.user.username} to ${member.guild.name}!`,
      }),
    ],
  });
}

export default new Event({
  eventName: Events.GuildMemberAdd,
  run: onGuildMemberAdd,
});
