const { Scenes, Markup } = require('telegraf');
const { bot } = require('../core/bot');

const partner_scene = new Scenes.WizardScene(
    'partner_scene',
    // Step 1: Ask for name
    async (ctx) => {
        ctx.wizard.state.partnerData = {};
        await ctx.reply("Ism, familiyangizni kiriting?");
        return ctx.wizard.next();
    },
    // Step 2: Get name and ask for technology
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.leave();
        }

        ctx.wizard.state.partnerData.fullName = ctx.message.text;
        
        await ctx.reply("💻 Texnologiya:\n\nTalab qilinadigan texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating. Masalan,\njava, C++, C#", {
            parse_mode: 'HTML'
        });
        
        return ctx.wizard.next();
    },
    // Step 3: Get technology and ask for phone
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.leave();
        }

        ctx.wizard.state.partnerData.technologies = ctx.message.text;
        
        await ctx.reply("📞 Aloqa:\n\nBog'lanish uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67", {
            parse_mode: 'HTML'
        });
        
        return ctx.wizard.next();
    },
    // Step 4: Get phone and confirm
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.leave();
        }

        ctx.wizard.state.partnerData.phone = ctx.message.text;
        
        const confirmMessage = `<b>Ma'lumotlar to'g'riligini tekshiring:</b>\n\n` +
            `👤 Ism, familiya: ${ctx.wizard.state.partnerData.fullName}\n` +
            `💻 Texnologiyalar: ${ctx.wizard.state.partnerData.technologies}\n` +
            `📞 Aloqa: ${ctx.wizard.state.partnerData.phone}\n\n` +
            `Ma'lumotlar to'g'rimi?`;
        
        await ctx.reply(confirmMessage, {
            parse_mode: 'HTML',
            ...Markup.keyboard([
                ["✅ Ha", "🔄 Qaytadan"],
                ["❌ Bekor qilish"]
            ])
            .oneTime()
            .resize()
        });
        
        return ctx.wizard.next();
    },
    // Step 5: Handle confirmation
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.leave();
        }

        if (ctx.message?.text === "🔄 Qaytadan") {
            await ctx.reply("Qaytadan ma'lumotlarni kiritish", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.enter('partner_scene');
        }

        if (ctx.message?.text === "✅ Ha") {
            const notificationMessage = `<b>Yangi sheriklik uchun ariza!</b>\n\n` +
                `👤 Ism, familiya: ${ctx.wizard.state.partnerData.fullName}\n` +
                `💻 Texnologiyalar: ${ctx.wizard.state.partnerData.technologies}\n` +
                `📞 Aloqa: ${ctx.wizard.state.partnerData.phone}`;

            // Send to admin (you'll need to configure ADMIN_ID in your .env)
            await bot.telegram.sendMessage(process.env.ADMIN_ID, notificationMessage, {
                parse_mode: 'HTML'
            });

            await ctx.reply("✅ Arizangiz muvaffaqiyatli yuborildi.\nAdminlar tez orada ko'rib chiqishadi.", {
                reply_markup: { remove_keyboard: true }
            });
        }

        return ctx.scene.leave();
    }
);

module.exports = {
    partner_scene
};
