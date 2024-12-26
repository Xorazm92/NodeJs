import { User } from "../models/user.model.js";
import { bot } from "../core/bot.js";
import { menu_elon } from "../libs/menu_ads.js";

bot.on("message:contact", async (ctx) => {
  const contact = ctx.message.contact;
  const user_id = ctx.message.from.id;

  const data = await User.find({ user_id });
  const userData = data?.[0];
  
  if (userData) {
    menu_elon(ctx);
    await User.updateOne({ user_id }, { phone_number: contact.phone_number });
  } else {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
  }
});
