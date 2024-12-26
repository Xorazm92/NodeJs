import { User } from "../models/user.model.js";
import { bot } from "../core/bot.js";
import { Keyboard } from "grammy";

// Start buyrug'ini qayta ishlash
bot.command("start", async (ctx) => {
  // Foydalanuvchi ma'lumotlarini olish
  const new_user_id = ctx.update.message.from.id;
  const username = ctx.update.message.from.username || "";
  const first_name = ctx.update.message.from.first_name || "";
  const last_name = ctx.update.message.from.last_name || "";

  // Foydalanuvchini tekshirish va saqlash
  const data = await User.find({ user_id: new_user_id });
  const user = data?.[0];
  
  if (!user) {
    const newUser = new User({
      user_id: new_user_id,
      username,
      first_name,
      last_name,
    });
    await newUser.save();
  }

  // Asosiy menyuni ko'rsatish
  const welcomeText = `Assalom alaykum ${first_name}!\n\nUstozShogird kanalining rasmiy botiga xush kelibsiz!\n\n/help yordam buyrug'i orqali nimalarga qodir ekanligimni bilib oling!`;
  
  await ctx.reply(welcomeText, {
    parse_mode: "HTML",
    reply_markup: new Keyboard()
      .text("Sherik kerak")
      .text("Ish joyi kerak")
      .row()
      .text("Hodim kerak")
      .text("Ustoz kerak")
      .row()
      .text("Shogird kerak")
      .row()
      .oneTime()
      .resized(),
  });
});

// Help buyrug'ini qayta ishlash
bot.command("help", async (ctx) => {
  const helpText = `<b>Bot imkoniyatlari:</b>

@UstozShogird kanalida siz Programmalash bo'yicha:
#Ustoz,
#Shogird,
#Sherik,
#Xodim va
#IshJoyi 
topishingiz mumkin.

E'lon beringa va @UstozShogird kanaliga a'zo bo'lishni unutmang.

Rahmat!!!`;

  await ctx.reply(helpText, {
    parse_mode: "HTML"
  });
});
