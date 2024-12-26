const { Markup } = require('telegraf');
const { job_seeker_scene } = require('../scenes/job_seeker.scene');

const job_seeker_hears = async (ctx) => {
    try {
        const message = `Ish joyi topish uchun ariza berish\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`;
        
        await ctx.reply(message, {
            parse_mode: 'HTML',
            ...Markup.keyboard([
                ["❌ Bekor qilish"]
            ])
            .oneTime()
            .resize()
        });

        ctx.scene.enter('job_seeker_scene');
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    job_seeker_hears
};
