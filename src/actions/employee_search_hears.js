const { Markup } = require('telegraf');
const { employee_search_scene } = require('../scenes/employee_search.scene');

const employee_search_hears = async (ctx) => {
    try {
        const message = `Xodim topish uchun ariza berish\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`;
        
        await ctx.reply(message, {
            parse_mode: 'HTML',
            ...Markup.keyboard([
                ["❌ Bekor qilish"]
            ])
            .oneTime()
            .resize()
        });

        ctx.scene.enter('employee_search_scene');
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    employee_search_hears
};
