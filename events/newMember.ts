import Folody from "Folody";
import { AttachmentBuilder, Events } from "discord.js";
import BotEvent from "modules/event";
import WelcomeCard from "modules/images/welcome";

export default new BotEvent({
  event: Events.GuildMemberAdd,
  async run(member) {
    const folody = member.client as Folody;

    const welcomeChannelId = await folody.db.get<string>(`${member.guild.id}.channel.welcome`);

    if (!welcomeChannelId) return;

    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
    if (!welcomeChannel?.isTextBased()) return;

    if (member.user.bot) return welcomeChannel.send(`Có con npc ${member.user} vào si vi kìa men :scream: :scream: :scream:`);

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
  },
});
