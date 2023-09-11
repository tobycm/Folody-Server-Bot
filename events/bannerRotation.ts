import Folody from "Folody";
import { Events } from "discord.js";
import Event from "modules/event";

export default new Event({
  eventName: Events.ClientReady,
  async run(client) {
    const folodyCommunity = await client.guilds.fetch("911173438708785153");

    setTimeout(
      async () => {
        if (!folodyCommunity.available) return; // djs bảo làm thế cho chắc

        const banner = (client as Folody).branding.banners.shift();

        if (!banner) return;

        await folodyCommunity.setBanner(banner);
        (client as Folody).branding.banners.push(banner);
      },
      1000 * 60 * 60 * 24 // 24 hours
    );
  },
});
