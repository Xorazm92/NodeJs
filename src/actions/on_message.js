import { User } from "../models/user.model.js";
import { Ads } from "../models/ads.model.js";
import { bot } from "../core/bot.js";
import { saveAdsMenu } from "../libs/confirm.js";

bot.on("message", async (ctx) => {
  const user_id = ctx.update.message.from.id;
  const user = await User.findOne({ user_id });
  
  if (!user) {
    await ctx.reply(`Iltimos, avval /start buyrug'ini bosing`);
    return;
  }

  let tg_link = user.username;
  const ads = await Ads.findOne({ user_id });
  
  if (!ads) {
    return;
  }

  let state = ads.ads_state;
  let category = ads.category;

  if (state == "name") {
    if (ctx.update.message?.text) {
      ads.name = ctx.update.message.text;
      ads.tg_link = tg_link;
      category === "hodim"
        ? (ads.ads_state = "phone")
        : (ads.ads_state = "age");
      await ads.save();

      let txt = category === "hodim"
        ? "<b>Telefon raqamini kiriting:</b> (namuna: 931234567)"
        : "<b>Yoshingizni kiriting:</b> (namuna: 25)";
      
      await ctx.reply(txt, {
        parse_mode: "HTML",
      });
    } else {
      let txt = category === "hodim" 
        ? "Firma yoki tashkilot nomini kiriting:"
        : "Ismingizni kiriting:";
      
      await ctx.reply(txt, {
        parse_mode: "HTML",
      });
    }
  } else if (state == "age") {
    if (ctx.update.message?.text) {
      if (isNaN(ctx.update.message.text)) {
        await ctx.reply("<b>Yoshingizni raqamda kiriting!</b>", {
          parse_mode: "HTML",
        });
        return;
      }
      ads.age = ctx.update.message.text;
      ads.ads_state = "phone";
      await ads.save();
      await ctx.reply("<b>Telefon raqamini kiriting:</b> (namuna: 931234567)", {
        parse_mode: "HTML",
      });
    } else {
      await ctx.reply("<b>Yoshingizni kiriting:</b> (namuna: 25)", {
        parse_mode: "HTML",
      });
    }
  } else if (state == "phone") {
    if (ctx.update.message?.text) {
      if (isNaN(ctx.update.message.text)) {
        await ctx.reply("<b>Telefon raqamini to'g'ri kiriting!</b>", {
          parse_mode: "HTML",
        });
        return;
      }
      ads.phone = ctx.update.message.text;
      ads.ads_state = "call_time";
      await ads.save();
      await ctx.reply(
        "<b>Murojaat qilish vaqtini kiriting:</b> (namuna: 9:00 - 18:00)",
        {
          parse_mode: "HTML",
        }
      );
    } else {
      await ctx.reply("<b>Telefon raqamini kiriting:</b> (namuna: 931234567)", {
        parse_mode: "HTML",
      });
    }
  } else if (state == "call_time") {
    if (ctx.update.message?.text) {
      ads.call_time = ctx.update.message.text;
      ads.ads_state = "technology";
      await ads.save();
      await ctx.reply(
        "<b>Texnologiya va bilimlaringizni kiriting:</b> (namuna: HTML, CSS, JavaScript)",
        {
          parse_mode: "HTML",
        }
      );
    } else {
      await ctx.reply(
        "<b>Murojaat qilish vaqtini kiriting:</b> (namuna: 9:00 - 18:00)",
        {
          parse_mode: "HTML",
        }
      );
    }
  } else if (state == "technology") {
    if (ctx.update.message?.text) {
      ads.technology = ctx.update.message.text;
      ads.ads_state = "degree";
      await ads.save();
      await ctx.reply(
        "<b>Darajangizni kiriting:</b> (namuna: Junior, Middle, Senior)",
        {
          parse_mode: "HTML",
        }
      );
    } else {
      await ctx.reply(
        "<b>Texnologiya va bilimlaringizni kiriting:</b> (namuna: HTML, CSS, JavaScript)",
        {
          parse_mode: "HTML",
        }
      );
    }
  } else if (state == "degree") {
    if (ctx.update.message?.text) {
      ads.degree = ctx.update.message.text;
      ads.ads_state = "work_place";
      await ads.save();
      await ctx.reply(
        "<b>Hozirgi o'qish yoki ish joyingizni kiriting:</b>",
        {
          parse_mode: "HTML",
        }
      );
    } else {
      await ctx.reply(
        "<b>Darajangizni kiriting:</b> (namuna: Junior, Middle, Senior)",
        {
          parse_mode: "HTML",
        }
      );
    }
  } else if (state == "work_place") {
    if (ctx.update.message?.text) {
      ads.work_place = ctx.update.message.text;
      ads.ads_state = category === "hodim" ? "work_time" : "price";
      await ads.save();
      let txt = category === "hodim"
        ? "<b>Ish vaqtini kiriting:</b> (namuna: 9:00 - 18:00)"
        : "<b>Narxni kiriting:</b> (namuna: 300$)";
      await ctx.reply(txt, {
        parse_mode: "HTML",
      });
    } else {
      await ctx.reply(
        "<b>Hozirgi o'qish yoki ish joyingizni kiriting:</b>",
        {
          parse_mode: "HTML",
        }
      );
    }
  } else if (state == "work_time") {
    if (ctx.update.message?.text) {
      ads.work_time = ctx.update.message.text;
      ads.ads_state = "price";
      await ads.save();
      await ctx.reply("<b>Narxni kiriting:</b> (namuna: 300$)", {
        parse_mode: "HTML",
      });
    } else {
      await ctx.reply(
        "<b>Ish vaqtini kiriting:</b> (namuna: 9:00 - 18:00)",
        {
          parse_mode: "HTML",
        }
      );
    }
  } else if (state == "price") {
    if (ctx.update.message?.text) {
      ads.price = ctx.update.message.text;
      ads.ads_state = "region";
      await ads.save();
      await ctx.reply("<b>Hududni kiriting:</b> (namuna: Toshkent)", {
        parse_mode: "HTML",
      });
    } else {
      await ctx.reply("<b>Narxni kiriting:</b> (namuna: 300$)", {
        parse_mode: "HTML",
      });
    }
  } else if (state == "region") {
    if (ctx.update.message?.text) {
      ads.region = ctx.update.message.text;
      ads.ads_state = "info";
      await ads.save();
      await ctx.reply(
        "<b>Qo'shimcha ma'lumot kiriting:</b>",
        {
          parse_mode: "HTML",
        }
      );
    } else {
      await ctx.reply("<b>Hududni kiriting:</b> (namuna: Toshkent)", {
        parse_mode: "HTML",
      });
    }
  } else if (state == "info") {
    if (ctx.update.message?.text) {
      ads.info = ctx.update.message.text;
      ads.ads_state = "finish";
      await ads.save();
      await saveAdsMenu(ctx);
    } else {
      await ctx.reply(
        "<b>Qo'shimcha ma'lumot kiriting:</b>",
        {
          parse_mode: "HTML",
        }
      );
    }
  }
});
