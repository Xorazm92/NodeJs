const { Composer } = require('grammy');
const { Menu } = require('@grammyjs/menu');

const partner_scene = new Composer();

// Ma'lumotlarni saqlash uchun obyekt
let partnerData = {};

// Ism so'rash
partner_scene.command('sherik', async (ctx) => {
    partnerData = {};
    await ctx.reply("Ism, familiyangizni kiriting?", {
        reply_markup: {
            keyboard: [["❌ Bekor qilish", "🏠 Bosh menyu"]],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    ctx.session.step = 'waiting_partner_name';
});

// Ismni saqlash va texnologiya so'rash
partner_scene.hears(/.*/, async (ctx) => {
    if (ctx.session.step !== 'waiting_partner_name') return;
    
    if (ctx.message.text === "❌ Bekor qilish" || ctx.message.text === "🏠 Bosh menyu") {
        await ctx.reply("Amaliyot bekor qilindi", {
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
        ctx.session.step = null;
        return;
    }

    partnerData.fullName = ctx.message.text;
    await ctx.reply("💻 Texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating. Masalan,\njava, C++, C#", {
        parse_mode: 'HTML'
    });
    ctx.session.step = 'waiting_partner_technologies';
});

// Texnologiyalarni saqlash va telefon so'rash
partner_scene.hears(/.*/, async (ctx) => {
    if (ctx.session.step !== 'waiting_partner_technologies') return;

    if (ctx.message.text === "❌ Bekor qilish" || ctx.message.text === "🏠 Bosh menyu") {
        await ctx.reply("Amaliyot bekor qilindi", {
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
        ctx.session.step = null;
        return;
    }

    partnerData.technologies = ctx.message.text;
    await ctx.reply("📞 Aloqa uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67", {
        parse_mode: 'HTML'
    });
    ctx.session.step = 'waiting_partner_phone';
});

// Telefonni saqlash va tasdiqlash
partner_scene.hears(/.*/, async (ctx) => {
    if (ctx.session.step !== 'waiting_partner_phone') return;

    if (ctx.message.text === "❌ Bekor qilish" || ctx.message.text === "🏠 Bosh menyu") {
        await ctx.reply("Amaliyot bekor qilindi", {
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
        ctx.session.step = null;
        return;
    }

    partnerData.phone = ctx.message.text;
    
    const confirmMessage = `<b>Ma'lumotlar to'g'riligini tekshiring:</b>\n\n` +
        `👤 Ism, familiya: ${partnerData.fullName}\n` +
        `💻 Texnologiyalar: ${partnerData.technologies}\n` +
        `📞 Aloqa: ${partnerData.phone}\n\n` +
        `Ma'lumotlar to'g'rimi?`;
    
    await ctx.reply(confirmMessage, {
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [
                ["✅ Ha", "🔄 Qaytadan"],
                ["❌ Bekor qilish", "🏠 Bosh menyu"]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
    
    ctx.session.step = 'waiting_partner_confirmation';
});

// Tasdiqlash
partner_scene.hears(/.*/, async (ctx) => {
    if (ctx.session.step !== 'waiting_partner_confirmation') return;

    if (ctx.message.text === "❌ Bekor qilish" || ctx.message.text === "🏠 Bosh menyu") {
        await ctx.reply("Amaliyot bekor qilindi", {
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
        ctx.session.step = null;
        return;
    }

    if (ctx.message.text === "🔄 Qaytadan") {
        await ctx.reply("Qaytadan ma'lumotlarni kiritish", {
            reply_markup: {
                keyboard: [["❌ Bekor qilish", "🏠 Bosh menyu"]],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
        ctx.session.step = 'waiting_partner_name';
        return;
    }

    if (ctx.message.text === "✅ Ha") {
        const notificationMessage = `<b>Yangi sheriklik uchun ariza!</b>\n\n` +
            `👤 Ism, familiya: ${partnerData.fullName}\n` +
            `💻 Texnologiyalar: ${partnerData.technologies}\n` +
            `📞 Aloqa: ${partnerData.phone}`;

        // Send to admin
        await ctx.api.sendMessage(process.env.ADMIN_ID, notificationMessage, {
            parse_mode: 'HTML'
        });

        await ctx.reply("✅ Arizangiz muvaffaqiyatli yuborildi.\nAdminlar tez orada ko'rib chiqishadi.", {
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

        ctx.session.step = null;
    }
});

module.exports = {
    partner_scene
};
