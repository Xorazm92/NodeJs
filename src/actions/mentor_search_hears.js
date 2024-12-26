const { Markup } = require('telegraf');
const { mentor_search_scene } = require('../scenes/mentor_search.scene');

const mentor_search_hears = async (ctx) => {
    try {
        const message = `Ustoz topish uchun ariza berish\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`;
        
        await ctx.reply(message, {
            parse_mode: 'HTML',
            ...Markup.keyboard([
                ["❌ Bekor qilish"]
            ])
            .oneTime()
            .resize()
        });

        ctx.scene.enter('mentor_search_scene');
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    mentor_search_hears
};
