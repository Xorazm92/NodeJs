const { Bot, session, Scenes } = require('grammy');
const { config } = require('dotenv');
const { limit: rateLimit } = require('@grammyjs/ratelimiter');
const { partner_scene } = require('../scenes/partner.scene.js');
const { job_seeker_scene } = require('../scenes/job_seeker.scene.js');
const { employee_search_scene } = require('../scenes/employee_search.scene.js');
const { mentor_search_scene } = require('../scenes/mentor_search.scene.js');
const { apprentice_search_scene } = require('../scenes/apprentice_search.scene.js');
const { partner_hears } = require('../actions/partner_hears.js');
const { job_seeker_hears } = require('../actions/job_seeker_hears.js');
const { employee_search_hears } = require('../actions/employee_search_hears.js');
const { mentor_search_hears } = require('../actions/mentor_search_hears.js');
const { apprentice_search_hears } = require('../actions/apprentice_search_hears.js');

config();

// Bot yaratish va sozlash
const bot = new Bot(process.env.BOT_API);

// Scene manager
const stage = new Scenes.Stage([
    partner_scene, 
    job_seeker_scene, 
    employee_search_scene,
    mentor_search_scene,
    apprentice_search_scene
]);

// Sessiya middleware
bot.use(session({
    initial: () => ({
        step: "idle",
        data: {},
        __scenes: {},
    })
}));

// Scene middleware
bot.use(stage.middleware());

// Command handlers
bot.command("sherik", partner_hears);
bot.hears("🤝 Sherik kerak", partner_hears);
bot.command("ish", job_seeker_hears);
bot.hears("💼 Ish joyi kerak", job_seeker_hears);
bot.command("xodim", employee_search_hears);
bot.hears("👨‍💼 Xodim kerak", employee_search_hears);
bot.command("ustoz", mentor_search_hears);
bot.hears("👨‍🏫 Ustoz kerak", mentor_search_hears);
bot.command("shogird", apprentice_search_hears);
bot.hears("👨‍🎓 Shogird kerak", apprentice_search_hears);

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

module.exports = {
    bot
};
