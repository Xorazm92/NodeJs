const { Bot, session } = require('grammy');
const { Menu } = require('@grammyjs/menu');
const { conversations, createConversation } = require('@grammyjs/conversations');
const { limit: rateLimit } = require('@grammyjs/ratelimiter');
const { config } = require('dotenv');
const scenes = require('../scenes');
const actions = require('../actions');

config();

// Bot yaratish
const bot = new Bot(process.env.BOT_API);

// Middleware'larni ulash
bot.use(session({
    initial: () => ({
        step: null,
        data: {}
    })
}));

bot.use(conversations());

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

// Bekor qilish va Bosh menyu tugmalarini tekshirish
bot.hears(['❌ Bekor qilish', '🏠 Bosh menyu'], async (ctx) => {
    ctx.session.step = null;
    ctx.session.data = {};
    await ctx.reply('Bosh menyuga qaytdingiz', {
        reply_markup: {
            keyboard: [
                ["🔍 Sherik kerak", "🎯 Ish joyi kerak"],
                ["👨‍💼 Xodim kerak", "👨‍🏫 Ustoz kerak"],
                ["👨‍🎓 Shogird kerak"]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
});

// Xatolarni qayta ishlash
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    console.error(err.error);
    
    ctx.reply("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.").catch((e) => {
        console.error("Error while sending error message:", e);
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
