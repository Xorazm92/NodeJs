import { Ads } from "../models/ads.model.js";

export async function createAds(ctx, category) {
  const userId = ctx.callbackQuery.from.id;
  
  const newAds = new Ads({
    user_id: userId,
    category: category,
    ads_state: "name",
  });
  await newAds.save();

  let txt;
  if (category === "hodim") {
    txt = "Firma yoki tashkilot nomini kiriting:";
  } else {
    txt = "Familiya va ismingizni kiriting:";
  }

  await ctx.reply(txt);
}
