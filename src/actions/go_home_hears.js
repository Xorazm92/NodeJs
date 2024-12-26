const { bot } = require("../core/bot");
const { Keyboard } = require("grammy");

const go_home_hears = async (ctx) => {
    try {
        await ctx.reply("Bosh menyu", {
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
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    go_home_hears
};
