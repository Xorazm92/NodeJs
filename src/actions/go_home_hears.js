import { bot } from "../core/bot.js";
import { Keyboard } from "grammy";

bot.hears("🏠 Bosh sahifa", async (ctx) => {
  await ctx.reply(`<b>Bosh sahifa!</b>`, {
    parse_mode: "HTML",
    reply_markup: new Keyboard()
      .text("🔍 E'lonlarni ko'rish")
      .text("📣 E'lon berish")
      .row()
      .text("♻️ Tilni o'zgartirish")
      .row()
      .oneTime()
      .resized(),
  });
});
bot.hears("🏠 Home page", async (ctx) => {
  await ctx.reply(`<b>Home page!</b>`, {
    parse_mode: "HTML",
    reply_markup: new Keyboard()
      .text("🔍 Show Advertisement")
      .text("📣 Give Advertisement")
      .row()
      .row()
      .text("♻️ Change language")
      .oneTime()
      .resized(),
  });
});
