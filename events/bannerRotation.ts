import Folody from "Folody";
import { Client, Events } from "discord.js";
import Event from "modules/event";

async function onReady(folody: Client) {
  const folodyCommunity = await folody.guilds.fetch("911173438708785153");

  setTimeout(
    async () => {
      if (!folodyCommunity.available) return; // djs bảo làm thế cho chắc

      const banner = (folody as Folody).branding.banners.shift();

      if (!banner) return;

      await folodyCommunity.setBanner(banner);
      (folody as Folody).branding.banners.push(banner);
    },
    1000 * 60 * 60 * 24 // 24 hours
  );
}

export default new Event({
  eventName: Events.ClientReady,
  run: onReady,
});
