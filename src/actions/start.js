const { User } = require('../models/user.model.js');

// Foydalanuvchini tekshirish va saqlash
async function checkUser(ctx) {
    const user_id = ctx.from.id;
    const username = ctx.from.username || "";
    const first_name = ctx.from.first_name || "";
    const last_name = ctx.from.last_name || "";

    try {
        let user = await User.findOne({ telegramId: user_id });
        
        if (!user) {
            user = new User({
                telegramId: user_id,
                username,
                firstName: first_name,
                lastName: last_name
            });
            await user.save();
        }
    } catch (err) {
        console.error('Foydalanuvchini saqlashda xatolik:', err);
    }
}

// Start buyrug'ini qayta ishlash
async function start(ctx) {
    await checkUser(ctx);
    
    const message = `Assalomu alaykum <b>${ctx.from.first_name}</b>!\n\nMen IT sohasida sherik, xodim, ustoz va shogird topishga yordam beruvchi botman.\n\nKerakli bo'limni tanlang:`;
    
    await ctx.reply(message, {
        parse_mode: 'HTML',
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
}

// Help buyrug'ini qayta ishlash
async function help(ctx) {
    const helpText = `<b>Bot buyruqlari:</b>\n\n` +
        `/sherik - Sherik topish uchun ariza berish\n` +
        `/ish - Ish joyi topish uchun ariza berish\n` +
        `/xodim - Xodim topish uchun ariza berish\n` +
        `/ustoz - Ustoz topish uchun ariza berish\n` +
        `/shogird - Shogird topish uchun ariza berish\n\n` +
        `<i>Yuqoridagi har bir buyruq orqali o'zingizga mos keluvchi sherik/ish/xodim/ustoz/shogird topishingiz mumkin.</i>`;
    
    await ctx.reply(helpText, {
        parse_mode: 'HTML'
    });
}

module.exports = {
    start,
    help
};
