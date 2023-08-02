import { Image, loadImage, registerFont } from "canvas";
import { Canvas } from "canvas-constructor/cairo";
import { GuildMember } from "discord.js";
import { weirdToNormalChars } from "weird-to-normal-chars";

registerFont("./assets/Uni_Sans_Heavy.otf", { family: "Discord" });
registerFont("./assets/DejaVuSansCondensed-Bold.ttf", {
  family: "Discordx",
});

const pictures = [
  "https://cdn.discordapp.com/attachments/955639718815621151/1136098424312320041/1690937289044.jpg", // thx cauvang 870825189586378843
  "https://cdn.discordapp.com/attachments/1123259943735275652/1130682229337628714/Untitled_design.png", // thx denki 857177948057370624
  "https://images-ext-1.discordapp.net/external/8ee8wDpH97bsFT50gSOJUJ_R9XLXCrvlvQOD2Z0jqFk/%3Fsize%3D1024/https/cdn.discordapp.com/banners/911173438708785153/ced61a08f9cdbae8f3fa36f6abbaba83.png?width=1200&height=675", // thx fosly 989176587469586482
];

const pictureCache = new Map<string, Image>();

export async function getPicture(): Promise<Image> {
  const theChosenPicture =
    pictures[Math.floor(Math.random() * pictures.length)];
  if (pictureCache.has(theChosenPicture))
    return pictureCache.get(theChosenPicture)!;
  const picture = await loadImage(theChosenPicture);
  pictureCache.set(theChosenPicture, picture);
  return picture;
}

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
    .printImage(await getPicture(), 0, 0, 1024, 450)
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
