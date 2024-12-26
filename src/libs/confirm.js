import { Ads } from "../models/ads.model.js";
import { Keyboard } from "grammy";

export async function saveAdsMenu(ctx) {
  const ads = await Ads.findOne({ user_id: ctx.update.message.from.id });

  if (!ads) {
    await ctx.reply("E'lon topilmadi");
    return;
  }

  const {
    category,
    name,
    phone,
    age,
    tg_link,
    call_time,
    technology,
    degree,
    work_place,
    work_time,
    region,
    info,
    price,
  } = ads;

  let adsText = "";
  
  if (category === "hodim") {
    adsText = `<b>HODIM QIDIRILMOQDA:</b>\n\n` +
      `🏦 Tashkilot: ${name}\n` +
      `📞 Telefon: ${phone}\n` +
      `✉️ Telegram: @${tg_link}\n` +
      `⏰ Murojaat vaqti: ${call_time}\n` +
      `📚 Texnologiyalar: ${technology}\n` +
      `📈 Daraja: ${degree}\n` +
      `🏢 Ishlash joyi: ${work_place}\n` +
      `⏳ Ish vaqti: ${work_time}\n` +
      `💵 Maosh: ${price}\n` +
      `🌏 Hudud: ${region}\n` +
      `😇 Qo'shimcha: ${info}`;
  } else if (category === "ustoz") {
    adsText = `<b>USTOZ QIDIRILMOQDA:</b>\n\n` +
      `🧑‍💻 Shogird: ${name}\n` +
      `📆 Yoshi: ${age}\n` +
      `📞 Telefon: ${phone}\n` +
      `✉️ Telegram: @${tg_link}\n` +
      `⏰ Murojaat vaqti: ${call_time}\n` +
      `📚 Texnologiyalar: ${technology}\n` +
      `📈 Daraja: ${degree}\n` +
      `🏢 Ishlash joyi: ${work_place}\n` +
      `⏳ Ish vaqti: ${work_time}\n` +
      `🌏 Hudud: ${region}\n` +
      `😇 Qo'shimcha: ${info}`;
  } else if (category === "shogird") {
    adsText = `<b>SHOGIRD QIDIRILMOQDA:</b>\n\n` +
      `🧑‍💻 Ustoz: ${name}\n` +
      `📆 Yoshi: ${age}\n` +
      `📞 Telefon: ${phone}\n` +
      `✉️ Telegram: @${tg_link}\n` +
      `⏰ Murojaat vaqti: ${call_time}\n` +
      `📚 Texnologiyalar: ${technology}\n` +
      `📈 Daraja: ${degree}\n` +
      `🏢 Ishlash joyi: ${work_place}\n` +
      `⏳ Ish vaqti: ${work_time}\n` +
      `🌏 Hudud: ${region}\n` +
      `😇 Qo'shimcha: ${info}`;
  } else if (category === "sherik") {
    adsText = `<b>SHERIK QIDIRILMOQDA:</b>\n\n` +
      `🧑‍💻 Sherik: ${name}\n` +
      `📆 Yoshi: ${age}\n` +
      `📞 Telefon: ${phone}\n` +
      `✉️ Telegram: @${tg_link}\n` +
      `⏰ Murojaat vaqti: ${call_time}\n` +
      `📚 Texnologiyalar: ${technology}\n` +
      `📈 Daraja: ${degree}\n` +
      `🏢 Ishlash joyi: ${work_place}\n` +
      `💵 Sheriklik badali: ${price}\n` +
      `🌏 Hudud: ${region}\n` +
      `😇 Qo'shimcha: ${info}`;
  } else {
    adsText = `<b>ISH QIDIRILMOQDA:</b>\n\n` +
      `🧑‍💻 Nomzod: ${name}\n` +
      `📆 Yoshi: ${age}\n` +
      `📞 Telefon: ${phone}\n` +
      `✉️ Telegram: @${tg_link}\n` +
      `⏰ Murojaat vaqti: ${call_time}\n` +
      `📚 Texnologiyalar: ${technology}\n` +
      `📈 Daraja: ${degree}\n` +
      `🏢 Ishlash joyi: ${work_place}\n` +
      `⏳ Ish vaqti: ${work_time}\n` +
      `💵 Ko'zlagan maoshi: ${price}\n` +
      `🌏 Hudud: ${region}\n` +
      `😇 Qo'shimcha: ${info}`;
  }

  await ctx.reply(adsText, {
    parse_mode: "HTML",
    reply_markup: new Keyboard()
      .text("✅ E'lonni tasdiqlash")
      .row()
      .text("❌ E'lonni bekor qilish")
      .row()
      .oneTime()
      .resized(),
  });
}
