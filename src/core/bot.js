import { Bot, session } from "grammy";
import { config } from "dotenv";
import { limit as rateLimit } from '@grammyjs/ratelimiter';

config();

// Bot yaratish va sozlash
export const bot = new Bot(process.env.BOT_API);

// Sessiya middleware
bot.use(session({
  initial: () => ({
    step: "idle",
    data: {}
  })
}));

// So'rovlar sonini cheklash
bot.use(rateLimit({
  timeFrame: 2000,
  limit: 3,
}));

// Xatolarni qayta ishlash
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`${ctx.update.update_id} yangilanishini qayta ishlashda xato:`);
  console.error(err.error);
  
  // Foydalanuvchiga xato haqida xabar berish
  ctx.reply("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.").catch((e) => {
    console.error("Xato xabarini yuborishda muammo:", e);
  });
});

// Botni to'xtatish
const botniToxtatis = () => {
  console.log("Bot to'xtatilmoqda...");
  bot.stop();
};

// Jarayonni to'xtatish signallarini qayta ishlash
process.on('SIGTERM', botniToxtatis);
process.on('SIGINT', botniToxtatis);

// Botni ishga tushirish
console.log("Bot ishga tushdi");
bot.start({
  drop_pending_updates: true,
  onStart: (botInfo) => {
    console.log(`@${botInfo.username} bot muvaffaqiyatli ishga tushdi`);
  },
});
