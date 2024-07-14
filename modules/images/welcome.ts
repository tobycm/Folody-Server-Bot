import { Image, loadImage, registerFont } from "canvas";
import { Canvas } from "canvas-constructor/cairo";
import { GuildMember } from "discord.js";
import { weirdToNormalChars } from "weird-to-normal-chars";

registerFont("./assets/Uni_Sans_Heavy.otf", { family: "Discord" });
registerFont("./assets/DejaVuSansCondensed-Bold.ttf", {
  family: "Discordx",
});

const pictures: string[] = [];

const pictureCache = new Map<string, Image>();

export async function getPicture(): Promise<Image> {
  if (pictures.length === 0) throw new Error("No pictures available");

  while (true) {
    const theChosenPicture = pictures[Math.floor(Math.random() * pictures.length)];
    if (pictureCache.has(theChosenPicture)) return pictureCache.get(theChosenPicture)!;
    try {
      const picture = await loadImage(theChosenPicture);
      pictureCache.set(theChosenPicture, picture);
      return picture;
    } catch (e) {
      console.error("Error loading picture", theChosenPicture);
      pictures.splice(pictures.indexOf(theChosenPicture), 1);
      continue;
    }
  }
}

export default async function WelcomeCard(member: GuildMember): Promise<Buffer> {
  const avatar = await loadImage(member.user.displayAvatarURL({ size: 4096, extension: "png", forceStatic: true }) ?? member.user.defaultAvatarURL);

  const canvas = new Canvas(1024, 450);

  try {
    canvas.printImage(await getPicture(), 0, 0, 1024, 450);
  } catch (e) {
    // can't load picture
    canvas.setColor("#1E1E1E").printRectangle(0, 0, 1024, 450);
  }

  canvas
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
    .printText(`To ${member.guild.name}`, 512, 430);

  return canvas.toBufferAsync();
}
