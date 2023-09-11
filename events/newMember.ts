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

  if (member.user.id === "867741983774212166") {
    welcomeChannel.send(`Có tên nào đấy vừa vào si vi nhưng do chúng tôi anti tên đấy nên bị đá đít luôn rồi :scream: :scream: :scream:`);
    member.ban();
    setTimeout(() => member.guild.members.unban("867741983774212166"), 5000);
    return;
  }

  if (member.user.bot)
    return welcomeChannel.send(
      `Có con npc ${member} vào si vi kìa men :scream: :scream: :scream:`
    );

  welcomeChannel.send({
    content:
      `<:pepehooray:1125131846267711488> ${member.user}\n` +
      `**<:folody:933915537233289336> Hi there!**\n` +
      `- Please read <#955639800168316998>\n` +
      `- Hope you have a good time in our server\n\n` +
      `<:hithere:1131104394750984202> <@&993522874897940540> | <@&960561360624840724> Say hi to new member <:hithere:1131104394750984202>\n` +
      `There's a \`${member.guild.memberCount}\` member coming in <:whatsup:1124364311230431293>`,
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
