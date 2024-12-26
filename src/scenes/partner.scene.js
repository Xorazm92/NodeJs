const { Composer } = require('grammy');
const { Menu } = require('@grammyjs/menu');

const partner_scene = new Composer();

// Bekor qilish va Bosh menyu tugmalarini tekshirish
partner_scene.hears(['❌ Bekor qilish', '🏠 Bosh menyu'], async (ctx) => {
    ctx.session.step = null;
    ctx.session.data = {};
    await ctx.reply('Bosh menyuga qaytdingiz', {
        reply_markup: {
            keyboard: [
                ["🔍 Sherik kerak", "🎯 Ish joyi kerak"],
                ["👨‍💼 Xodim kerak", "👨‍🏫 Ustoz kerak"],
                ["👨‍🎓 Shogird kerak"]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
});

// Ism-familiyani olish
partner_scene.command('sherik', async (ctx) => {
    ctx.session.step = 'waiting_partner_name';
    ctx.session.data = {};
    await ctx.reply("Ism, familiyangizni kiriting?", {
        reply_markup: {
            keyboard: [["❌ Bekor qilish", "🏠 Bosh menyu"]],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
});

partner_scene.on('message', async (ctx) => {
    if (!ctx.session.step) return;

    switch (ctx.session.step) {
        case 'waiting_partner_name':
            if (!ctx.message.text) {
                await ctx.reply("Iltimos, ismingizni text formatida kiriting");
                return;
            }
            ctx.session.data.name = ctx.message.text;
            ctx.session.step = 'waiting_partner_technology';
            await ctx.reply("💻 Texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating. Masalan,\njava, C++, C#", {
                parse_mode: 'HTML'
            });
            break;

        case 'waiting_partner_technology':
            ctx.session.data.technology = ctx.message.text;
            ctx.session.step = 'waiting_partner_phone';
            await ctx.reply("📞 Aloqa uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67", {
                parse_mode: 'HTML'
            });
            break;

        case 'waiting_partner_phone':
            const phoneRegex = /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
            if (!phoneRegex.test(ctx.message.text.replace(/\s+/g, ''))) {
                await ctx.reply("Iltimos, telefon raqamingizni to'g'ri formatda kiriting\nMasalan: +998 90 123 45 67");
                return;
            }
            ctx.session.data.phone = ctx.message.text;
            ctx.session.step = 'confirm';

            // Ma'lumotlarni tasdiqlash
            const confirmMessage = `Quyidagi ma'lumotlar to'g'rimi?\n\n` +
                `👤 Ism, familiya: ${ctx.session.data.name}\n` +
                `💻 Texnologiyalar: ${ctx.session.data.technology}\n` +
                `📞 Tel: ${ctx.session.data.phone}`;

            const menu = new Menu('confirm-menu')
                .text('✅ Ha', async (ctx) => {
                    // Ma'lumotlarni adminga yuborish
                    const adminMessage = `Yangi sherik topish e'loni:\n\n` +
                        `👤 Ism, familiya: ${ctx.session.data.name}\n` +
                        `💻 Texnologiyalar: ${ctx.session.data.technology}\n` +
                        `📞 Tel: ${ctx.session.data.phone}`;

                    await ctx.api.sendMessage(process.env.ADMIN_ID, adminMessage);
                    await ctx.reply("E'loningiz adminga yuborildi. Tez orada kanalda e'lon qilinadi!");
                    
                    // Sessiyani tozalash
                    ctx.session.step = null;
                    ctx.session.data = {};
                })
                .text('❌ Yo\'q', (ctx) => {
                    ctx.session.step = 'waiting_partner_name';
                    ctx.reply("Ism, familiyangizni kiriting?");
                });

            await ctx.reply(confirmMessage, { reply_markup: menu });
            break;
    }
});

module.exports = {
    partner_scene
};
