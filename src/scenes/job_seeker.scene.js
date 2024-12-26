const { Composer } = require('grammy');
const { Menu } = require('@grammyjs/menu');

const job_seeker_scene = new Composer();

// Bekor qilish va Bosh menyu tugmalarini tekshirish
job_seeker_scene.hears(['❌ Bekor qilish', '🏠 Bosh menyu'], async (ctx) => {
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
job_seeker_scene.on('message', async (ctx) => {
    if (!ctx.session.step) return;

    switch (ctx.session.step) {
        case 'waiting_job_seeker_name':
            if (!ctx.message.text) {
                await ctx.reply("Iltimos, ismingizni text formatida kiriting");
                return;
            }
            ctx.session.data.name = ctx.message.text;
            ctx.session.step = 'waiting_job_seeker_age';
            await ctx.reply("Yoshingizni kiriting?");
            break;

        case 'waiting_job_seeker_age':
            const age = parseInt(ctx.message.text);
            if (isNaN(age) || age < 10 || age > 90) {
                await ctx.reply("Iltimos, yoshingizni to'g'ri kiriting (10 dan 90 gacha)");
                return;
            }
            ctx.session.data.age = age;
            ctx.session.step = 'waiting_job_seeker_technology';
            await ctx.reply("Qaysi texnologiyalarni bilasiz?");
            break;

        case 'waiting_job_seeker_technology':
            ctx.session.data.technology = ctx.message.text;
            ctx.session.step = 'waiting_job_seeker_phone';
            await ctx.reply("Telefon raqamingizni kiriting?\nMasalan: +998 90 123 45 67");
            break;

        case 'waiting_job_seeker_phone':
            const phoneRegex = /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
            if (!phoneRegex.test(ctx.message.text.replace(/\s+/g, ''))) {
                await ctx.reply("Iltimos, telefon raqamingizni to'g'ri formatda kiriting\nMasalan: +998 90 123 45 67");
                return;
            }
            ctx.session.data.phone = ctx.message.text;
            ctx.session.step = 'waiting_job_seeker_price';
            await ctx.reply("Kutilayotgan oylik maoshni kiriting?");
            break;

        case 'waiting_job_seeker_price':
            ctx.session.data.price = ctx.message.text;
            ctx.session.step = 'waiting_job_seeker_location';
            await ctx.reply("Manzilingizni kiriting?");
            break;

        case 'waiting_job_seeker_location':
            ctx.session.data.location = ctx.message.text;
            ctx.session.step = 'confirm';

            // Ma'lumotlarni tasdiqlash
            const confirmMessage = `Quyidagi ma'lumotlar to'g'rimi?\n\n` +
                `👤 Ism: ${ctx.session.data.name}\n` +
                `📅 Yosh: ${ctx.session.data.age}\n` +
                `💻 Texnologiyalar: ${ctx.session.data.technology}\n` +
                `📞 Tel: ${ctx.session.data.phone}\n` +
                `💰 Maosh: ${ctx.session.data.price}\n` +
                `📍 Manzil: ${ctx.session.data.location}`;

            const menu = new Menu('confirm-menu')
                .text('✅ Ha', async (ctx) => {
                    // Ma'lumotlarni adminga yuborish
                    const adminMessage = `Yangi ish qidirish e'loni:\n\n` +
                        `👤 Ism: ${ctx.session.data.name}\n` +
                        `📅 Yosh: ${ctx.session.data.age}\n` +
                        `💻 Texnologiyalar: ${ctx.session.data.technology}\n` +
                        `📞 Tel: ${ctx.session.data.phone}\n` +
                        `💰 Maosh: ${ctx.session.data.price}\n` +
                        `📍 Manzil: ${ctx.session.data.location}`;

                    await ctx.api.sendMessage(process.env.ADMIN_ID, adminMessage);
                    await ctx.reply("E'loningiz adminga yuborildi. Tez orada kanalda e'lon qilinadi!");
                    
                    // Sessiyani tozalash
                    ctx.session.step = null;
                    ctx.session.data = {};
                })
                .text('❌ Yo\'q', (ctx) => {
                    ctx.session.step = 'waiting_job_seeker_name';
                    ctx.reply("Ism, familiyangizni kiriting?");
                });

            await ctx.reply(confirmMessage, { reply_markup: menu });
            break;
    }
});

module.exports = {
    job_seeker_scene
};
