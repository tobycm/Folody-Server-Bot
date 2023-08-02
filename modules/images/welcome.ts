import { loadImage, registerFont } from "canvas";
import { Canvas } from "canvas-constructor/cairo";
import { GuildMember } from "discord.js";
import { weirdToNormalChars } from "weird-to-normal-chars";

registerFont("./assets/Uni_Sans_Heavy.otf", { family: "Discord" });
registerFont("./assets/DejaVuSansCondensed-Bold.ttf", {
  family: "Discordx",
});

const background = await loadImage(
  "https://cdn.discordapp.com/attachments/1123259943735275652/1130682229337628714/Untitled_design.png"
);

export default async function WelcomeCard(
  member: GuildMember
): Promise<Buffer> {
  const avatar = await loadImage(
    member.user.displayAvatarURL({
      size: 4096,
      extension: "png",
      forceStatic: true,
    }) ?? member.user.defaultAvatarURL
  );

  return new Canvas(1024, 450)
    .printImage(background, 0, 0, 1024, 450)
    .setColor("#FFFFFF")
    .printCircle(512, 155, 120)
    .printCircularImage(avatar, 512, 155, 115)
    .setTextAlign("center")
    .setTextFont("70px Discord")
    .printText(`Welcome`, 512, 355)
    .setTextAlign("center")
    .setColor("#FFFFFF")
    .setTextFont("45px Discordx")
    .printText(weirdToNormalChars(member.user.username), 512, 395)
    .setTextAlign("center")
    .setColor("#FFFFFF")
    .setTextFont("30px Discord")
    .printText(`To ${member.guild.name}`, 512, 430)
    .toBufferAsync();
}
