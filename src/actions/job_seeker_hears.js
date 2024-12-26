const { Keyboard } = require('grammy');

const job_seeker_hears = async (ctx) => {
    try {
        await ctx.reply("Ish joyi topish uchun ariza berish", {
            reply_markup: {
                keyboard: [
                    ["❌ Bekor qilish", "🏠 Bosh menyu"]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
        ctx.session.step = 'waiting_job_seeker_name';
        await ctx.reply("Ism, familiyangizni kiriting?");
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    job_seeker_hears
};
