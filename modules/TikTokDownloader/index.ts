/*  by Naufal Taufiq Ridwan
    Github : https://github.com/n0l3r
    Don't remove credit.
*/

// adding useragent to avoid ip bans
const headers = new Headers();
headers.append(
  "User-Agent",
  "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet"
);
const headersWm = new Headers();
headersWm.append(
  "User-Agent",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
);

const videoIdRegex = /https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)/;

async function downloadMedia(url: string): Promise<Buffer> {
  return Buffer.from(await (await fetch(url)).arrayBuffer());
}

async function getVideoNoWM(id: string): Promise<string> {
  return await (
    await (
      await fetch(
        `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${id}`,
        { method: "GET", headers: headers }
      )
    ).json()
  ).aweme_list[0].video.play_addr.url_list[0];
}

async function getVideoId(url: string): Promise<string> {
  const matches = (
    await fetch(url, { method: "GET", headers: headersWm })
  ).url.match(videoIdRegex);
  if (!matches) throw new Error("Invalid TikTok URL");
  return matches[1];
}

export async function downloadOne(url: string): Promise<Buffer> {
  const id = await getVideoId(url);
  return await downloadMedia(await getVideoNoWM(id));
}
