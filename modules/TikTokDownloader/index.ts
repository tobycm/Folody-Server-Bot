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

async function downloadMedia(url: string): Promise<ArrayBuffer> {
  return (await fetch(url)).arrayBuffer();
}

async function getVideoNoWM(url: string): Promise<{ url: string; id: string }> {
  const idVideo = getVideoId(url);
  return {
    url: (
      await (
        await fetch(
          `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}`,
          { method: "GET", headers: headers }
        )
      ).json()
    ).aweme_list[0].video.play_addr.url_list[0],
    id: idVideo,
  };
}

async function getRedirectUrl(url: string): Promise<string> {
  if (url.includes("vm.tiktok.com") || url.includes("vt.tiktok.com"))
    url = (await (await fetch(url, { redirect: "follow" })).json()).url;

  return url;
}

function getVideoId(url: string): string {
  if (!url.includes("/video/")) throw new Error("Invalid TikTok video URL");

  const idVideo = url.substring(url.indexOf("/video/") + 7, url.length);
  return idVideo.length > 19
    ? idVideo.substring(0, idVideo.indexOf("?"))
    : idVideo;
}

export async function downloadOne(url: string): Promise<ArrayBuffer> {
  return await downloadMedia(
    (await getVideoNoWM(await getRedirectUrl(url))).url
  );
}
