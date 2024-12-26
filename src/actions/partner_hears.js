const { Markup } = require('telegraf');
const { partner_scene } = require('../scenes/partner.scene');

const partner_hears = async (ctx) => {
    try {
        const message = `Sherik topish uchun ariza berish\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`;
        
        await ctx.reply(message, {
            parse_mode: 'HTML',
            ...Markup.keyboard([
                ["❌ Bekor qilish"]
            ])
            .oneTime()
            .resize()
        });

        ctx.scene.enter('partner_scene');
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    partner_hears
};
