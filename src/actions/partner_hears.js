async function partner_hears(ctx) {
    try {
        const message = `Sherik topish uchun ariza berish\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`;
        
        await ctx.reply(message, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [["❌ Bekor qilish", "🏠 Bosh menyu"]],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });

        ctx.session.step = 'waiting_partner_name';
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    partner_hears
};
