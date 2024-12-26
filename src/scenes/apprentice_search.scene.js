const { Scenes, Markup } = require('telegraf');
const { bot } = require('../core/bot');

const apprentice_search_scene = new Scenes.WizardScene(
    'apprentice_search_scene',
    // Step 1: Ask for name
    async (ctx) => {
        ctx.wizard.state.apprenticeData = {};
        await ctx.reply("Ism, familiyangizni kiriting?");
        return ctx.wizard.next();
    },
    // Step 2: Get name and ask for age
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.leave();
        }

        ctx.wizard.state.apprenticeData.fullName = ctx.message.text;
        
        await ctx.reply("🔢 Yosh:\n\nYoshingizni kiriting?\nMasalan, 19", {
            parse_mode: 'HTML'
        });
        
        return ctx.wizard.next();
    },
    // Step 3: Get age and ask for technology
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.leave();
        }

        ctx.wizard.state.apprenticeData.age = ctx.message.text;
        
        await ctx.reply("💻 Texnologiya:\n\nTalab qilinadigan texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating. Masalan,\njava, C++, C#", {
            parse_mode: 'HTML'
        });
        
        return ctx.wizard.next();
    },
    // Step 4: Get technology and ask for phone
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.leave();
        }

        ctx.wizard.state.apprenticeData.technologies = ctx.message.text;
        
        await ctx.reply("📞 Aloqa:\n\nBog'lanish uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67", {
            parse_mode: 'HTML'
        });
        
        return ctx.wizard.next();
    },
    // Step 5: Get phone and ask for location
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.leave();
        }

        ctx.wizard.state.apprenticeData.phone = ctx.message.text;
        
        await ctx.reply("📍 Hudud:\n\nQaysi hududdansiz?\nViloyat nomi, Toshkent shahar yoki Respublikani kiriting.", {
            parse_mode: 'HTML'
        });
        
        return ctx.wizard.next();
    },
    // Step 6: Get location and ask for price
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.leave();
        }

        ctx.wizard.state.apprenticeData.location = ctx.message.text;
        
        await ctx.reply("💰 Narxi:\n\nTolov qilish imkoniyatingiz?\n(Oylik yoki darslik narxini kiriting)", {
            parse_mode: 'HTML'
        });
        
        return ctx.wizard.next();
    },
    // Step 7: Get price and show confirmation
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: Markup.keyboard([
                    ["🔍 Sherik kerak", "🎯 Ish joyi kerak"],
                    ["👨‍💼 Xodim kerak", "👨‍🏫 Ustoz kerak"],
                    ["👨‍🎓 Shogird kerak"]
                ])
                .oneTime()
                .resize()
            });
            return ctx.scene.leave();
        }

        ctx.wizard.state.apprenticeData.price = ctx.message.text;
        
        const confirmMessage = `<b>Ma'lumotlar to'g'riligini tekshiring:</b>\n\n` +
            `👤 Ism, familiya: ${ctx.wizard.state.apprenticeData.fullName}\n` +
            `🔢 Yosh: ${ctx.wizard.state.apprenticeData.age}\n` +
            `💻 Texnologiyalar: ${ctx.wizard.state.apprenticeData.technologies}\n` +
            `📞 Aloqa: ${ctx.wizard.state.apprenticeData.phone}\n` +
            `📍 Hudud: ${ctx.wizard.state.apprenticeData.location}\n` +
            `💰 Narxi: ${ctx.wizard.state.apprenticeData.price}\n\n` +
            `Ma'lumotlar to'g'rimi?`;
        
        await ctx.reply(confirmMessage, {
            parse_mode: 'HTML',
            ...Markup.keyboard([
                ["✅ Ha", "🔄 Qaytadan"],
                ["❌ Bekor qilish", "🏠 Bosh menyu"]
            ])
            .oneTime()
            .resize()
        });
        
        return ctx.wizard.next();
    },
    // Step 8: Handle confirmation
    async (ctx) => {
        if (ctx.message?.text === "❌ Bekor qilish" || ctx.message?.text === "🏠 Bosh menyu") {
            await ctx.reply("Amaliyot bekor qilindi", {
                reply_markup: Markup.keyboard([
                    ["🔍 Sherik kerak", "🎯 Ish joyi kerak"],
                    ["👨‍💼 Xodim kerak", "👨‍🏫 Ustoz kerak"],
                    ["👨‍🎓 Shogird kerak"]
                ])
                .oneTime()
                .resize()
            });
            return ctx.scene.leave();
        }

        if (ctx.message?.text === "🔄 Qaytadan") {
            await ctx.reply("Qaytadan ma'lumotlarni kiritish", {
                reply_markup: { remove_keyboard: true }
            });
            return ctx.scene.enter('apprentice_search_scene');
        }

        if (ctx.message?.text === "✅ Ha") {
            const notificationMessage = `<b>Yangi shogird qidirish e'loni!</b>\n\n` +
                `👤 Ism, familiya: ${ctx.wizard.state.apprenticeData.fullName}\n` +
                `🔢 Yosh: ${ctx.wizard.state.apprenticeData.age}\n` +
                `💻 Texnologiyalar: ${ctx.wizard.state.apprenticeData.technologies}\n` +
                `📞 Aloqa: ${ctx.wizard.state.apprenticeData.phone}\n` +
                `📍 Hudud: ${ctx.wizard.state.apprenticeData.location}\n` +
                `💰 Narxi: ${ctx.wizard.state.apprenticeData.price}`;

            // Send to admin
            await bot.telegram.sendMessage(process.env.ADMIN_ID, notificationMessage, {
                parse_mode: 'HTML'
            });

            // Send to group
            await bot.telegram.sendMessage(process.env.GROUP_ID, notificationMessage, {
                parse_mode: 'HTML'
            });

            await ctx.reply("✅ Arizangiz muvaffaqiyatli yuborildi.\nAdminlar tez orada ko'rib chiqishadi.", {
                reply_markup: Markup.keyboard([
                    ["🔍 Sherik kerak", "🎯 Ish joyi kerak"],
                    ["👨‍💼 Xodim kerak", "👨‍🏫 Ustoz kerak"],
                    ["👨‍🎓 Shogird kerak"]
                ])
                .oneTime()
                .resize()
            });
        }

        return ctx.scene.leave();
    }
);

module.exports = {
    apprentice_search_scene
};
