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
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [{ text: "🔍 Sherik kerak", callback_data: "sherik" }, { text: "🎯 Ish joyi kerak", callback_data: "ish" }],
                [{ text: "👨‍💼 Xodim kerak", callback_data: "xodim" }, { text: "👨‍🏫 Ustoz kerak", callback_data: "ustoz" }],
                [{ text: "👨‍🎓 Shogird kerak", callback_data: "shogird" }]
            ]
        }
    });
}

// Help buyrug'ini qayta ishlash
async function help(ctx) {
    const message = `<b>Botdan foydalanish yo'riqnomasi:</b>\n\n` +
        `1. Sherik topish uchun - "🔍 Sherik kerak"\n` +
        `2. Ish topish uchun - "🎯 Ish joyi kerak"\n` +
        `3. Xodim topish uchun - "👨‍💼 Xodim kerak"\n` +
        `4. Ustoz topish uchun - "👨‍🏫 Ustoz kerak"\n` +
        `5. Shogird topish uchun - "👨‍🎓 Shogird kerak"\n\n` +
        `❗️ Har bir bo'limda kerakli ma'lumotlarni kiritasiz va adminlar tomonidan tekshirilgandan so'ng kanalda e'lon qilinadi.`;

    await ctx.reply(message, {
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [{ text: "🔍 Sherik kerak", callback_data: "sherik" }, { text: "🎯 Ish joyi kerak", callback_data: "ish" }],
                [{ text: "👨‍💼 Xodim kerak", callback_data: "xodim" }, { text: "👨‍🏫 Ustoz kerak", callback_data: "ustoz" }],
                [{ text: "👨‍🎓 Shogird kerak", callback_data: "shogird" }]
            ]
        }
    });
}

module.exports = {
    start,
    help
};
