const { Composer } = require('grammy');
const { Menu } = require('@grammyjs/menu');

const employee_search_scene = new Composer();

// Bekor qilish va Bosh menyu tugmalarini tekshirish
employee_search_scene.hears(['❌ Bekor qilish', '🏠 Bosh menyu'], async (ctx) => {
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

// Xodim qidirish
employee_search_scene.on('message', async (ctx) => {
    if (!ctx.session.step) return;

    switch (ctx.session.step) {
        case 'waiting_employee_company':
            if (!ctx.message.text) {
                await ctx.reply("Iltimos, kompaniya nomini text formatida kiriting");
                return;
            }
            ctx.session.data.company = ctx.message.text;
            ctx.session.step = 'waiting_employee_technology';
            await ctx.reply("Qaysi texnologiyalarni bilishi kerak?");
            break;

        case 'waiting_employee_technology':
            ctx.session.data.technology = ctx.message.text;
            ctx.session.step = 'waiting_employee_phone';
            await ctx.reply("Telefon raqamingizni kiriting?\nMasalan: +998 90 123 45 67");
            break;

        case 'waiting_employee_phone':
            const phoneRegex = /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
            if (!phoneRegex.test(ctx.message.text.replace(/\s+/g, ''))) {
                await ctx.reply("Iltimos, telefon raqamingizni to'g'ri formatda kiriting\nMasalan: +998 90 123 45 67");
                return;
            }
            ctx.session.data.phone = ctx.message.text;
            ctx.session.step = 'waiting_employee_location';
            await ctx.reply("Kompaniya manzilini kiriting?");
            break;

        case 'waiting_employee_location':
            ctx.session.data.location = ctx.message.text;
            ctx.session.step = 'waiting_employee_responsible';
            await ctx.reply("Mas'ul ism sharifi?");
            break;

        case 'waiting_employee_responsible':
            ctx.session.data.responsiblePerson = ctx.message.text;
            ctx.session.step = 'waiting_employee_contact_hours';
            await ctx.reply("Murojaat qilish vaqti?");
            break;

        case 'waiting_employee_contact_hours':
            ctx.session.data.contactHours = ctx.message.text;
            ctx.session.step = 'confirm';

            // Ma'lumotlarni tasdiqlash
            const confirmMessage = `Quyidagi ma'lumotlar to'g'rimi?\n\n` +
                `🏢 Kompaniya: ${ctx.session.data.company}\n` +
                `💻 Texnologiyalar: ${ctx.session.data.technology}\n` +
                `📞 Tel: ${ctx.session.data.phone}\n` +
                `📍 Manzil: ${ctx.session.data.location}\n` +
                `👨‍💼 Mas'ul: ${ctx.session.data.responsiblePerson}\n` +
                `⏰ Murojaat vaqti: ${ctx.session.data.contactHours}`;

            const menu = new Menu('confirm-menu')
                .text('✅ Ha', async (ctx) => {
                    // Ma'lumotlarni adminga yuborish
                    const adminMessage = `Yangi xodim qidirish e'loni:\n\n` +
                        `🏢 Kompaniya: ${ctx.session.data.company}\n` +
                        `💻 Texnologiyalar: ${ctx.session.data.technology}\n` +
                        `📞 Tel: ${ctx.session.data.phone}\n` +
                        `📍 Manzil: ${ctx.session.data.location}\n` +
                        `👨‍💼 Mas'ul: ${ctx.session.data.responsiblePerson}\n` +
                        `⏰ Murojaat vaqti: ${ctx.session.data.contactHours}`;

                    await ctx.api.sendMessage(process.env.ADMIN_ID, adminMessage);
                    await ctx.reply("E'loningiz adminga yuborildi. Tez orada kanalda e'lon qilinadi!");
                    
                    // Sessiyani tozalash
                    ctx.session.step = null;
                    ctx.session.data = {};
                })
                .text('❌ Yo\'q', (ctx) => {
                    ctx.session.step = 'waiting_employee_company';
                    ctx.reply("Kompaniya nomini kiriting?");
                });

            await ctx.reply(confirmMessage, { reply_markup: menu });
            break;
    }
});

// Xodim qidirishni boshlash
employee_search_scene.hears('👨‍💼 Xodim kerak', async (ctx) => {
    ctx.session.step = 'waiting_employee_company';
    await ctx.reply("Kompaniya nomini kiriting?");
});

module.exports = {
    employee_search_scene
};
