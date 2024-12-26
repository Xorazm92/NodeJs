const { Keyboard } = require('grammy');

const employee_search_hears = async (ctx) => {
    try {
        const message = `Xodim topish uchun ariza berish\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`;
        
        await ctx.reply(message, {
            reply_markup: {
                keyboard: [
                    ["❌ Bekor qilish", "🏠 Bosh menyu"]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });

        ctx.session.step = 'waiting_employee_company';
        await ctx.reply("Kompaniya nomini kiriting?");
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    employee_search_hears
};
