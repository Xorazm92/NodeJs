import { Keyboard, InlineKeyboard } from "grammy";

export async function menu_elon(ctx) {
  await ctx.reply(`"Yangi e'lonni qo'shish" tugmasini bosing`, {
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
}

export async function inlineMenu(ctx) {
  return await ctx.reply("<b>Yangi e'lon qo'shish uchun kerakli bo'limni tanlang:</b>", {
    parse_mode: "HTML",
    reply_markup: new InlineKeyboard()
      .text("ANDOZA ASOSIDA E'LON BERISH", "andoza")
      .row()
      .text("ERKIN SHAKLDA E'LON BERISH", "erkin")
      .row(),
  });
}
