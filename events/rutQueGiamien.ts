// rútQuẻGiamien.ts

import Folody from "Folody";
import {
  Events,
  MessageReaction,
  TextChannel,
  User,
  userMention,
} from "discord.js";
import Event from "modules/event";

export default new Event({
  eventName: Events.ClientReady,
  run: async (folody) =>
    (
      await (
        (await (await folody.guilds.fetch(
          "911173438708785153"
        ))!.channels.fetch("1133045965889216596")) as TextChannel
      ).messages.fetch("1133387885857480894")
    )
      .createReactionCollector()
      .on("collect", async (reaction: MessageReaction, user: User) => {
        if (reaction.partial) reaction = await reaction.fetch();
        if (reaction.emoji.name !== "🎴") return;

        const folody = reaction.client as Folody;

        const cooldown = await folody.db.get<number>(
          `rutQue.cooldown.${user.id}`
        );

        if (cooldown && cooldown > Date.now()) {
          const reply = await reaction.message.channel.send(
            userMention(user.id) +
              onCooldownMessages[
                Math.floor(Math.random() * onCooldownMessages.length)
              ]
          );
          setTimeout(() => reply.delete(), 7000);
          return;
        }

        const percent = Math.round(Math.random() * 100) + 1;

        let quẻ = "";

        if (percent >= 1 && !(percent >= 11))
          /* dai cat */ quẻ =
            `%mention% đã rút trúng một quẻ **Đại Cát**!\n\n` +
            `(づ｡◕‿‿◕｡)づ Ai mà may dữ zạ, ôm nay là một ngày rứt là may mắn với bạn đó >:3, share tụi tui ít nha`;
        if (percent <= 11 && !(percent >= 20))
          /* trung cat */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Trung Cát**!\n\n` +
            `Một ngày đẹp trời không mưa bão có khi lại vui ★~(◡﹏◕✿)`;
        if (percent <= 20 && !(percent >= 35))
          /* tieu cat */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Tiểu Cát**!\n\n` +
            `Hôm nay sẽ là một ngày hạnh phúc của bạn. Tự thưởng cho bản thân một chút cũng được nè (⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)♡ `;
        if (percent <= 35 && !(percent >= 42))
          /* cat */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Cát**!\n\n` +
            `Hôm nay bạn sẽ nhận được 1 niềm vui nhỏ nhỏ đấy (⁠ʘ⁠ᴗ⁠ʘ⁠✿⁠) Nhớ để ý xung quanh nha. `;
        if (percent <= 42 && !(percent >= 45))
          /* ban cat */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Bán Cát**!\n\n` +
            `Không tệ. Có lẽ hôm nay vẫn là một ngày mà bạn có thể yên tâm ngủ ngon đấy (⁠つ⁠≧⁠▽⁠≦⁠)⁠つ `;
        if (percent >= 45 && !(percent >= 53))
          /* mat cat */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Mạt Cát**!\n\n` +
            `Đừng lo! may mắn vẫn đang chờ bạn đó. Không phải bây giờ nhưng sẽ sớm thôi ᕙ⁠(⁠ ⁠¤⁠ ⁠〰⁠ ⁠¤⁠ ⁠)⁠ᕗ `;
        if (percent >= 53 && !(percent >= 68))
          /* mat tieu cat */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Mạt Tiểu Cát**!\n\n` +
            `Kiên nhẫn nhé, hạnh phúc sắp tới rồi ଘ⁠(⁠ ⁠ˊ⁠ᵕ⁠ˋ⁠ ⁠)⁠ଓ`;
        if (percent >= 68 && !(percent >= 75))
          /* binh */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Bình**!\n\n` +
            `Bình trong Bình Thường, chắc hum nay hok có gì xấ xảy ra đau he ٩(˘◡˘)۶`;
        if (percent >= 75 && !(percent >= 80))
          /* hung */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Hung**!\n\n` +
            `Cũng không hẳn là tệ :whatsup:, tặng bạn con chim cánh cụt nè :penguin:`;
        if (percent >= 80 && !(percent >= 85))
          /* tieu hung */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Tiểu Hung** :v\n\n` +
            `Khá là đen đủi cho bạn, lại đây chơi cùng Folody-kun cho giải xui nào <:luvyou:1130475681084604436>`;
        if (percent >= 85 && !(percent >= 97))
          /* ban hung */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Bán Hung** đừng buồn nha\n\n` +
            `(◕︵◕) Đừng để những điều xui xẻo làm bạn tiêu cực <:ohmaigah:1131095848093220885>`;
        if (percent >= 97)
          /* mat hung */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Mạt Hung** U là trời\n\n` +
            `o(╥﹏╥)o Hãy cứ vô tư và lạc quan lên em ơi, nếu bạn cảm thấy khó khăn trong cuộc sống thì vẫn có thể tìm tới bạn bè hoặc bọn mình để chia sẻ`;
        if (percent == 100)
          /* dai hung */ quẻ =
            `Bạn %mention% đã rút ra quẻ **Đại Hung**...\n\n` +
            `(┛◉Д◉)┛彡┻━┻ Coi chừng tai ương, Coi chừng tai ương, Coi chừng tai ương! điều quan trọng là phải nhắc 3 lần, mong bạn sẽ không gặp đìu gì xui xẻo hum nay (👍≖‿‿≖)👍 `;

        const msg = await reaction.message.channel.send(
          quẻ.replace("%mention%", userMention(user.id))
        );

        await folody.db.set(
          `rutQue.cooldown.${user.id}`,
          Date.now() + 86400000
        );

        setTimeout(() => msg.delete(), 17000);
      }),
});

const onCooldownMessages = [
  " đã rút quẻ hôm nay rùi, mai quay lại sau he :3",
  " tham lam dữ z, đợi đến ngày mai đi >:3",
  " đã hết lượt, chúc bạn may mắn ngày mai <:luvyou:1130475681084604436>",
];
