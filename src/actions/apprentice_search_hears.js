const { Markup } = require('telegraf');
const { apprentice_search_scene } = require('../scenes/apprentice_search.scene');

const apprentice_search_hears = async (ctx) => {
    try {
        const message = `Shogird topish uchun ariza berish\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`;
        
        await ctx.reply(message, {
            parse_mode: 'HTML',
            ...Markup.keyboard([
                ["❌ Bekor qilish"]
            ])
            .oneTime()
            .resize()
        });

        ctx.scene.enter('apprentice_search_scene');
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    apprentice_search_hears
};
