const { Keyboard } = require('grammy');

const mentor_search_hears = async (ctx) => {
    try {
        await ctx.reply("Ustoz topish uchun ariza berish", {
            reply_markup: {
                keyboard: [
                    ["❌ Bekor qilish", "🏠 Bosh menyu"]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
        ctx.session.step = 'waiting_mentor_name';
        await ctx.reply("Ism, familiyangizni kiriting?");
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    mentor_search_hears
};
