import { Keyboard } from "grammy";
import { User } from "../models/user.model.js";
import { Ads } from "../models/ads.model.js";
import { bot } from "../core/bot.js";
import { menu_elon } from "../libs/menu_ads.js";
import { config } from "dotenv";
config();

// Sherik kerak
bot.hears("Sherik kerak", async (ctx) => {
  await handleAd(ctx, "sherik");
});

// Ish joyi kerak
bot.hears("Ish joyi kerak", async (ctx) => {
  await handleAd(ctx, "ish");
});

// Hodim kerak
bot.hears("Hodim kerak", async (ctx) => {
  await handleAd(ctx, "hodim");
});

// Ustoz kerak
bot.hears("Ustoz kerak", async (ctx) => {
  await handleAd(ctx, "ustoz");
});

// Shogird kerak
bot.hears("Shogird kerak", async (ctx) => {
  await handleAd(ctx, "shogird");
});

// E'lonni tasdiqlash
bot.hears("✅ E'lonni tasdiqlash", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const data = await Ads.find({ user_id });
  const ads = data?.[0];

  if (ads) {
    await Ads.updateOne(
      { user_id },
      {
        $set: {
          status: true,
        },
      }
    );

    await ctx.reply("✅ E'loningiz kanalga joylandi!", {
      parse_mode: "HTML",
      reply_markup: new Keyboard()
        .text("🏠 Bosh sahifa")
        .row()
        .oneTime()
        .resized(),
    });

    // Adminga xabar yuborish
    const adminMessage = `<b>Yangi e'lon qo'shildi!</b>\n\n` +
      `👤 Foydalanuvchi: @${ads.tg_link}\n` +
      `📱 Telefon: ${ads.phone}\n` +
      `📝 Kategoriya: ${ads.category}`;

    await bot.api.sendMessage(process.env.ADMIN_ID, adminMessage, {
      parse_mode: "HTML"
    });
  }
});

// E'lonni bekor qilish
bot.hears("❌ E'lonni bekor qilish", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  await Ads.deleteOne({ user_id });

  await ctx.reply("❌ E'lon bekor qilindi", {
    parse_mode: "HTML",
    reply_markup: new Keyboard()
      .text("🏠 Bosh sahifa")
      .row()
      .oneTime()
      .resized(),
  });
});

// Bosh sahifa
bot.hears("🏠 Bosh sahifa", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  await ctx.reply("Bosh sahifa", {
    reply_markup: new Keyboard()
      .text("➕ Yangi e'lon berish")
      .row()
      .text("📋 Mening e'lonlarim")
      .row()
      .text("💁 E'lon berish tartibi")
      .row()
      .oneTime()
      .resized(),
  });
});

// Yangi e'lon berish
bot.hears("➕ Yangi e'lon berish", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  await ctx.reply("E'lon turini tanlang:", {
    reply_markup: new Keyboard()
      .text("🏢 Hodim kerak")
      .row()
      .text("👨‍🏫 Ustoz kerak")
      .text("🎓 Shogird kerak")
      .row()
      .text("🤝 Sherik kerak")
      .text("💼 Ish joyi kerak")
      .row()
      .text("🏠 Bosh sahifa")
      .text("💁 E'lon berish tartibi")
      .row()
      .oneTime()
      .resized(),
  });
});

// Hodim kerak
bot.hears("🏢 Hodim kerak", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  await Ads.findOneAndDelete({ user_id });
  const ads = new Ads({
    user_id,
    category: "hodim",
    ads_state: "name",
  });
  await ads.save();

  await ctx.reply("Firma yoki tashkilot nomini kiriting:", {
    parse_mode: "HTML",
  });
});

// Ustoz kerak
bot.hears("👨‍🏫 Ustoz kerak", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  await Ads.findOneAndDelete({ user_id });
  const ads = new Ads({
    user_id,
    category: "ustoz",
    ads_state: "name",
  });
  await ads.save();

  await ctx.reply("Ismingizni kiriting:", {
    parse_mode: "HTML",
  });
});

// Shogird kerak
bot.hears("🎓 Shogird kerak", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  await Ads.findOneAndDelete({ user_id });
  const ads = new Ads({
    user_id,
    category: "shogird",
    ads_state: "name",
  });
  await ads.save();

  await ctx.reply("Ismingizni kiriting:", {
    parse_mode: "HTML",
  });
});

// Sherik kerak
bot.hears("🤝 Sherik kerak", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  await Ads.findOneAndDelete({ user_id });
  const ads = new Ads({
    user_id,
    category: "sherik",
    ads_state: "name",
  });
  await ads.save();

  await ctx.reply("Ismingizni kiriting:", {
    parse_mode: "HTML",
  });
});

// Ish joyi kerak
bot.hears("💼 Ish joyi kerak", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  await Ads.findOneAndDelete({ user_id });
  const ads = new Ads({
    user_id,
    category: "work",
    ads_state: "name",
  });
  await ads.save();

  await ctx.reply("Ismingizni kiriting:", {
    parse_mode: "HTML",
  });
});

// E'lon berish uchun yordamchi funksiya
async function handleAd(ctx, category) {
  const user_id = ctx.update.message.from.id;
  const data = await User.find({ user_id });
  const user = data?.[0];

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

  // Eski e'lonni o'chirish
  await Ads.deleteOne({ user_id });

  // Yangi e'lon yaratish
  const newAd = new Ads({
    user_id,
    category,
    ads_state: "name"
  });
  await newAd.save();

  // E'lon berish menyusini ko'rsatish
  await menu_elon(ctx);
}

bot.hears("📣 E'lon berish", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const data = await User.find({ user_id });
  const user = data?.[0];

  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
  } else {
    if (user.phone_number == "" || user.phone_number == null) {
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
    } else {
      await handleAd(ctx, "ish");
    }
  }
});
