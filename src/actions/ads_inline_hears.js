import { User } from "../models/user.model.js";
import { Ads } from "../models/ads.model.js";
import { bot } from "../core/bot.js";
import { createAds } from "../libs/create_ads.js";
import { config } from "dotenv";
config();

bot.on("callback_query:data", async (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  const user_id = ctx.callbackQuery.from.id;
  const data = await User.find({ user_id });
  const user = data?.[0];
  const lang = user.user_lang;

  // E'lonni yaratish bosqichlari
  if (callbackData === "erkin") {
    if (lang === "UZB") {
      await ctx.reply("Erkin shaklda e'lon berish tez orada qo'shiladi");
    } else if (lang === "ENG") {
      await ctx.reply("Freeform posting will be added soon");
    }
    return;
  }

  if (callbackData === "andoza") {
    if (lang === "UZB") {
      await ctx.editMessageText("<b>Kerakli andoza tanlang:</b>", {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "ISH QIDIRISH", callback_data: "ish" }],
            [{ text: "HODIM QIDIRISH", callback_data: "hodim" }],
            [{ text: "USTOZ QIDIRISH", callback_data: "ustoz" }],
            [{ text: "SHOGIRD QIDIRISH", callback_data: "shogird" }],
            [{ text: "SHERIK QIDIRISH", callback_data: "sherik" }],
            [{ text: "LOYIHA QIDIRISH", callback_data: "loyiha" }],
            [{ text: "ASOSIY SAHIFAGA QAYTISH", callback_data: "asosiy" }],
          ],
        },
      });
    } else if (lang === "ENG") {
      await ctx.editMessageText("<b>Select your template:</b>", {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "SEARCH WORK", callback_data: "ish" }],
            [{ text: "SEARCH EMPLOYEE", callback_data: "hodim" }],
            [{ text: "SEARCH TEACHER", callback_data: "ustoz" }],
            [{ text: "SEARCH STUDENT", callback_data: "shogird" }],
            [{ text: "SEARCH PARTNER", callback_data: "sherik" }],
            [{ text: "SEARCH PROJECT", callback_data: "loyiha" }],
            [{ text: "GO HOME PAGE", callback_data: "asosiy" }],
          ],
        },
      });
    }
    return;
  }

  // E'lon turini tanlash
  if (["ish", "hodim", "ustoz", "shogird", "sherik", "loyiha"].includes(callbackData)) {
    createAds(ctx, callbackData, lang);
    return;
  }

  // Asosiy sahifaga qaytish
  if (callbackData === "asosiy") {
    if (lang === "UZB") {
      await ctx.editMessageText(
        "<b>Yangi e'lon qo'shish uchun kerakli bo'limni tanlang:</b>",
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "ANDOZA ASOSIDA E'LON BERISH",
                  callback_data: "andoza",
                },
              ],
              [{ text: "ERKIN SHAKLDA E'LON BERISH", callback_data: "erkin" }],
            ],
          },
        }
      );
    } else if (lang === "ENG") {
      await ctx.editMessageText(
        "<b>To add a new ad, select one of the following:</b>",
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "ADVERTISEMENT BASED ON TEMPLATE",
                  callback_data: "andoza",
                },
              ],
              [{ text: "FREE ADVERTISEMENT", callback_data: "erkin" }],
            ],
          },
        }
      );
    }
    return;
  }

  // Admin tomonidan e'lonni tasdiqlash
  if (callbackData.slice(0, 2) == "ok") {
    let ads_id = callbackData.slice(3, callbackData.length);
    const ads = await Ads.findById(ads_id);

    if (ads) {
      await Ads.findByIdAndUpdate(ads_id, { status: true });

      let msgText, adsText;

      if (lang === "UZB") {
        msgText = `Tabriklayman! Ushbu e'lon operator tomonidan ma'qullandi! `;
        if (ads.category === "hodim")
          adsText = `<b>HODIM QIDIRILMOQDA:</b>\n\n🏦 Tashkilot: ${ads.name}\n📞 Telefon: ${ads.phone}\n✉️ Telegram: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Bilim-ko'nikmalar: ${ads.technology}\n📈 Daraja: ${ads.degree}\n⏳ Ish vaqti: ${ads.work_time}\n💵 Maosh: ${ads.price}\n🌏 Hudud: ${ads.region}\n😇 Qo'shimcha ma'lumot: ${ads.info}`;
        else if (ads.category === "ustoz")
          adsText = `<b>USTOZ QIDIRILMOQDA:</b>\n\n🧑‍💻 Shogird: ${ads.name}\n📆 Yoshi: ${ads.age}\n📞 Telefoni: ${ads.phone}\n✉️ Telegrami: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Talab qilinayotgan bilim-ko'nikmalar: ${ads.technology}\n📈 Daraja: ${ads.degree}\n🏦 Hozirgi o'qish-ish joyi: ${ads.work_place}\n💵 Shogirdlik badali: ${ads.price}\n🌏 Hudud: ${ads.region}\n😇 Xohish-istak va maqsadi: ${ads.info}`;
        else if (ads.category === "shogird")
          adsText = `<b>SHOGIRD QIDIRILMOQDA:</b>\n\n🧑‍💻 Ustoz: ${ads.name}\n📆 Yoshi: ${ads.age}\n📞 Telefoni: ${ads.phone}\n✉️ Telegrami: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Bilim-ko'nikmalar: ${ads.technology}\n📈 Daraja: ${ads.degree}\n🏦 Hozirgi o'qish-ish joyi: ${ads.work_place}\n💵 Shogirdlik badali: ${ads.price}\n🌏 Hudud: ${ads.region}\n😇 Xohish-istak va maqsadi: ${ads.info}`;
        else if (ads.category === "sherik")
          adsText = `<b>SHERIK QIDIRILMOQDA:</b>\n\n🧑‍💻 Sherik: ${ads.name}\n📆 Yoshi: ${ads.age}\n📞 Telefoni: ${ads.phone}\n✉️ Telegrami: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Bilim-ko'nikmalar: ${ads.technology}\n📈 Daraja: ${ads.degree}\n🏦 Hozirgi o'qish-ish joyi: ${ads.work_place}\n💵 Sheriklik badali: ${ads.price}\n🌏 Hudud: ${ads.region}\n😇 Xohish-istak va maqsadi: ${ads.info}`;
        else if (ads.category === "loyiha")
          adsText = `<b>LOYIHA QIDIRILMOQDA:</b>\n\n🧑‍💻 Mutaxassis: ${ads.name}\n📆 Yoshi: ${ads.age}\n📞 Telefoni: ${ads.phone}\n✉️ Telegrami: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Bilim-ko'nikmalari: ${ads.technology}\n📈 Darajasi: ${ads.degree}\n🏦 Hozirgi o'qish-ish joyi: ${ads.work_place}\n🌏 Ko'zlagan hududi: ${ads.region}\n😇 Xohish-istak va maqsadi: ${ads.info}`;
        else
          adsText = `<b>ISH QIDIRILMOQDA:</b>\n\n🧑‍💻 Nomzod: ${ads.name}\n📆 Yoshi: ${ads.age}\n📞 Telefoni: ${ads.phone}\n✉️ Telegrami: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Bilim-ko'nikmalari: ${ads.technology}\n📈 Darajasi: ${ads.degree}\n🏦 Hozirgi o'qish-ish joyi: ${ads.work_place}\n⏳ Ma'qul ish vaqti: ${ads.work_time}\n💵 Ko'zlagan maoshi: ${ads.price}\n🌏 Ko'zlagan hududi: ${ads.region}\n😇 Xohish-istak va maqsadi: ${ads.info}`;
      } else if (lang === "ENG") {
        // english text
      }

      adsText += `\n\n👍 @IT_materials`;
      adsText += `\n🤖 @N14_me_bot`;

      let post = await ctx.api.sendMessage(String(process.env.CHANEL), adsText, {
        parse_mode: "HTML",
      });
      ctx.editMessageText("Tasdiqlandi");

      await ctx.api.sendMessage(
        `${ads.user_id}`,
        `${msgText} https://t.me/material_it/${post.message_id}`,
        {
          parse_mode: "HTML",
        }
      );
      ads.post_id = String(post.message_id);
      await ads.save();
    }
    return;
  } else if (callbackData.slice(0, 2) == "no") {
    let ads_id = callbackData.slice(3, callbackData.length);
    const ads = await Ads.findById(ads_id);

    if (ads) {
      await Ads.findByIdAndDelete(ads_id);

      let msgText, adsText;

      if (lang === "UZB") {
        msgText = `Afsus! Usbu e'lon operator tomonidan ma'qullanmadi. Ma'lumotlarni to'g'rilab qayta yuboring! `;
        if (ads.category === "hodim")
          adsText = `<b>HODIM QIDIRILMOQDA:</b>\n\n🏦 Tashkilot: ${ads.name}\n📞 Telefon: ${ads.phone}\n✉️ Telegram: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Bilim-ko'nikmalar: ${ads.technology}\n📈 Daraja: ${ads.degree}\n⏳ Ish vaqti: ${ads.work_time}\n💵 Maosh: ${ads.price}\n🌏 Hudud: ${ads.region}\n😇 Qo'shimcha ma'lumot: ${ads.info}`;
        else if (ads.category === "ustoz")
          adsText = `<b>USTOZ QIDIRILMOQDA:</b>\n\n🧑‍💻 Shogird: ${ads.name}\n📆 Yoshi: ${ads.age}\n📞 Telefoni: ${ads.phone}\n✉️ Telegrami: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Talab qilinayotgan bilim-ko'nikmalar: ${ads.technology}\n📈 Daraja: ${ads.degree}\n🏦 Hozirgi o'qish-ish joyi: ${ads.work_place}\n💵 Shogirdlik badali: ${ads.price}\n🌏 Hudud: ${ads.region}\n😇 Xohish-istak va maqsadi: ${ads.info}`;
        else if (ads.category === "shogird")
          adsText = `<b>SHOGIRD QIDIRILMOQDA:</b>\n\n🧑‍💻 Ustoz: ${ads.name}\n📆 Yoshi: ${ads.age}\n📞 Telefoni: ${ads.phone}\n✉️ Telegrami: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Bilim-ko'nikmalar: ${ads.technology}\n📈 Daraja: ${ads.degree}\n🏦 Hozirgi o'qish-ish joyi: ${ads.work_place}\n💵 Shogirdlik badali: ${ads.price}\n🌏 Hudud: ${ads.region}\n😇 Xohish-istak va maqsadi: ${ads.info}`;
        else if (ads.category === "sherik")
          adsText = `<b>SHERIK QIDIRILMOQDA:</b>\n\n🧑‍💻 Sherik: ${ads.name}\n📆 Yoshi: ${ads.age}\n📞 Telefoni: ${ads.phone}\n✉️ Telegrami: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Bilim-ko'nikmalar: ${ads.technology}\n📈 Daraja: ${ads.degree}\n🏦 Hozirgi o'qish-ish joyi: ${ads.work_place}\n💵 Sheriklik badali: ${ads.price}\n🌏 Hudud: ${ads.region}\n😇 Xohish-istak va maqsadi: ${ads.info}`;
        else if (ads.category === "loyiha")
          adsText = `<b>LOYIHA QIDIRILMOQDA:</b>\n\n🧑‍💻 Mutaxassis: ${ads.name}\n📆 Yoshi: ${ads.age}\n📞 Telefoni: ${ads.phone}\n✉️ Telegrami: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Bilim-ko'nikmalari: ${ads.technology}\n📈 Darajasi: ${ads.degree}\n🏦 Hozirgi o'qish-ish joyi: ${ads.work_place}\n🌏 Ko'zlagan hududi: ${ads.region}\n😇 Xohish-istak va maqsadi: ${ads.info}`;
        else
          adsText = `<b>ISH QIDIRILMOQDA:</b>\n\n🧑‍💻 Nomzod: ${ads.name}\n📆 Yoshi: ${ads.age}\n📞 Telefoni: ${ads.phone}\n✉️ Telegrami: @${ads.tg_link}\n⏰ Murojaat vaqti: ${ads.call_time}\n📚 Bilim-ko'nikmalari: ${ads.technology}\n📈 Darajasi: ${ads.degree}\n🏦 Hozirgi o'qish-ish joyi: ${ads.work_place}\n⏳ Ma'qul ish vaqti: ${ads.work_time}\n💵 Ko'zlagan maoshi: ${ads.price}\n🌏 Ko'zlagan hududi: ${ads.region}\n😇 Xohish-istak va maqsadi: ${ads.info}`;
      } else if (lang === "ENG") {
        // english text
      }

      await ctx.api.sendMessage(`${ads.user_id}`, adsText, {
        parse_mode: "HTML",
      });
      ctx.editMessageText("Inkor qilindi");
      await ctx.api.sendMessage(`${ads.user_id}`, msgText);
    }
    return;
  } else if (callbackData.slice(0, 2) == "del") {
    let ads_id = callbackData.slice(4, callbackData.length);
    const ads = await Ads.findById(ads_id);

    if (!ads) {
      if (lang === "UZB") await ctx.reply(`Bu ads avval o'chirilgan`);
      else await ctx.reply(`This ad was previously deleted`);
    } else {
      if (ads.post_id != null) {
        try {
          await ctx.api.deleteMessage(process.env.CHANEL, Number(ads.post_id));
        } catch (error) {
          console.log(error);
        }
      }

      await Ads.findByIdAndDelete(ads._id);
      if (lang === "UZB") await ctx.reply(`E'lon o'chirildi`);
      else await ctx.reply(`The ad has been deleted`);
    }
    return;
  }
});

bot.hears("✅ E'lonni tasdiqlash", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  const ads = await Ads.findOne({ user_id });
  
  if (!ads) {
    await ctx.reply("E'lon topilmadi");
    return;
  }

  if (ads.ads_state !== "finish") {
    await ctx.reply("E'lon to'liq kiritilmagan");
    return;
  }

  await ctx.reply("E'loningiz muvaffaqiyatli saqlandi!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "➕ Yangi e'lon berish",
            callback_data: "erkin",
          },
        ],
        [
          {
            text: "📋 Mening e'lonlarim",
            callback_data: "my_ads",
          },
        ],
        [
          {
            text: "🏠 Bosh sahifa",
            callback_data: "asosiy",
          },
          {
            text: "💁 E'lon berish tartibi",
            callback_data: "order",
          },
        ],
      ],
    },
  });
});

bot.hears("❌ E'lonni bekor qilish", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  await Ads.findOneAndDelete({ user_id });

  await ctx.reply("E'lon bekor qilindi!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "➕ Yangi e'lon berish",
            callback_data: "erkin",
          },
        ],
        [
          {
            text: "📋 Mening e'lonlarim",
            callback_data: "my_ads",
          },
        ],
        [
          {
            text: "🏠 Bosh sahifa",
            callback_data: "asosiy",
          },
          {
            text: "💁 E'lon berish tartibi",
            callback_data: "order",
          },
        ],
      ],
    },
  });
});
