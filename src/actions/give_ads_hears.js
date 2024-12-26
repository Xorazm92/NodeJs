import { Keyboard, InlineKeyboard } from "grammy";
import { Ads } from "../models/ads.model.js";
import { User } from "../models/user.model.js";
import { bot } from "../core/bot.js";
import { config } from "dotenv";
import { menu_elon, inlineMenu } from "../libs/menu_ads.js";
config();

bot.hears("🗒 Men bergan e'lonlar", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const allAds = await Ads.find({ user_id }).sort({ post_id: -1 });
  
  if (!allAds || allAds.length == 0) {
    await ctx.reply(`<b>Sizda birorta ham faol e'lon mavjud emas</b>`, {
      parse_mode: "HTML",
    });
    return;
  }

  for (const ads of allAds) {
    try {
      await ctx.telegram.copyMessage(
        user_id,
        process.env.CHANEL,
        ads.post_id,
        {
          reply_markup: new InlineKeyboard()
            .text("❌ O'chirish", `del=${ads.id}`)
            .text("‼️ Reklama", `rek=${ads.id}`)
            .row(),
        }
      );
    } catch (error) {
      console.log("xatolik-Men bergan e'lonlar", error);
    }
  }

  await ctx.reply(`<b>Yangi e'lonni qo'shish </b> 👇`, {
    parse_mode: "HTML",
    reply_markup: new Keyboard()
      .text("🆕 Yangi e'lonni qo'shish")
      .row()
      .text("🗒 Men bergan e'lonlar")
      .row()
      .text("🏠 Bosh sahifa")
      .text("💁 E'lon berish tartibi")
      .row()
      .oneTime()
      .resized(),
  });
});

bot.hears("🆕 Yangi e'lonni qo'shish", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });

  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  if (!user.phone_number) {
    await ctx.reply(
      `Iltimos, <b>"Telefon raqamni yuborish"</b> tugmasini bosing! 👇`,
      {
        parse_mode: "HTML",
        reply_markup: new Keyboard()
          .requestContact("📱 Telefon raqamni yuborish")
          .text("🏠 Bosh sahifa")
          .row()
          .oneTime()
          .resized(),
      }
    );
    return;
  }

  await inlineMenu(ctx);
});

bot.hears("💁 E'lon berish tartibi", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  await ctx.reply(
    `<b>E'lon berish tartibi:</b>\n\n` +
    `1. E'lon turini tanlang\n` +
    `2. So'ralgan ma'lumotlarni kiriting\n` +
    `3. E'lonni tasdiqlang\n\n` +
    `<b>Qoidalar:</b>\n\n` +
    `1. Faqat IT sohasiga oid e'lonlar berilsin\n` +
    `2. E'lon matnida odob-axloq qoidalariga rioya qiling\n` +
    `3. Keraksiz ma'lumotlarni yozmang\n` +
    `4. E'lon faqat o'zbek tilida bo'lishi kerak\n\n` +
    `<b>Eslatma:</b>\n\n` +
    `- E'loningiz 24 soatdan keyin o'chiriladi\n` +
    `- Bir vaqtning o'zida faqat bitta e'lon bera olasiz\n` +
    `- E'loningizni bekor qilish yoki o'zgartirish uchun botga qayta /start buyrug'ini bering`,
    {
      parse_mode: "HTML",
      reply_markup: new Keyboard()
        .text("➕ Yangi e'lon berish")
        .row()
        .text("📋 Mening e'lonlarim")
        .row()
        .text("🏠 Bosh sahifa")
        .row()
        .oneTime()
        .resized(),
    }
  );
});
