import Folody from "Folody";
import { Events, GuildTextBasedChannel } from "discord.js";
import Event from "modules/event";

export default new Event({
  eventName: Events.GuildMemberRemove,
  async run(member) {
    const folody = member.client as Folody;

    const welcomeChannel = member.guild.channels.cache.get(
      (await folody.db.get<string>(`${member.guild.id}.channel.welcome`)) ??
        "955639718815621151"
    ) as GuildTextBasedChannel;

    if (!welcomeChannel) return;

    if (member.user.bot)
      return welcomeChannel.send(
        `Một thằng Ây Ai tên ${member} đã lướt khỏi server <:deobitnoigi:1135839824302059562>`
      );

    welcomeChannel.send({
      content: `> <:pepecri:1125136278095142912> Aw man, ${member.user} [\`${member.user.tag}\`] (\`${member.user.id}\`) đã rời xa khỏi server, mong bạn đó quay lại sớm :<`,
    });
  },
});
