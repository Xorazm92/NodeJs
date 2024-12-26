const { Bot, session } = require('grammy');
const { config } = require('dotenv');
const { limit: rateLimit } = require('@grammyjs/ratelimiter');
const scenes = require('../scenes');
const actions = require('../actions');

config();

// Bot yaratish
const bot = new Bot(process.env.BOT_API);

// Sessiya middleware
bot.use(session({
    initial: () => ({
        step: null,
        data: {}
    })
}));

// So'rovlar sonini cheklash
bot.use(rateLimit({
    timeFrame: 2000,
    limit: 3,
}));

// Scene'larni ulash
bot.use(scenes.partner_scene);
bot.use(scenes.job_seeker_scene);
bot.use(scenes.employee_search_scene);
bot.use(scenes.mentor_search_scene);
bot.use(scenes.apprentice_search_scene);

// Command handlers
bot.command("start", actions.start);
bot.command("help", actions.help);
bot.command("sherik", actions.partner_hears);
bot.hears("🔍 Sherik kerak", actions.partner_hears);
bot.command("ish", actions.job_seeker_hears);
bot.hears("🎯 Ish joyi kerak", actions.job_seeker_hears);
bot.command("xodim", actions.employee_search_hears);
bot.hears("👨‍💼 Xodim kerak", actions.employee_search_hears);
bot.command("ustoz", actions.mentor_search_hears);
bot.hears("👨‍🏫 Ustoz kerak", actions.mentor_search_hears);
bot.command("shogird", actions.apprentice_search_hears);
bot.hears("👨‍🎓 Shogird kerak", actions.apprentice_search_hears);

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

module.exports = {
    bot
};
