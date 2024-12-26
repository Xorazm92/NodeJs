const express = require('express');
const mongoose = require('mongoose');
const { config } = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const { bot } = require('./src/core/bot.js');
const scenes = require('./src/scenes');
const actions = require('./src/actions');

// Muhit o'zgaruvchilarini sozlash
config();

// Logger sozlamalari
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'xatolar.log', level: 'error' }),
        new winston.transports.File({ filename: 'umumiy.log' })
    ]
});

// Express ilovasini yaratish
const app = express();

// Middleware'larni sozlash
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// So'rovlar sonini cheklash
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// API yo'nalishlari
app.get('/', (req, res) => {
    res.json({ message: 'API is working' });
});

// Xizmatni to'xtatish
const xizmatniToxtatis = async () => {
    try {
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Xizmatni to\'xtatishda xatolik:', err);
        process.exit(1);
    }
};

// Serverni ishga tushirish
const serverniIshgaTushirish = async () => {
    try {
        // MongoDB'ga ulanish
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB\'ga muvaffaqiyatli ulandi');

        // Serverni ishga tushirish
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portda ishga tushdi`);
        });

        // Scene'larni ulash
        bot.use(scenes.partner_scene);
        bot.use(scenes.job_seeker_scene);
        bot.use(scenes.employee_search_scene);
        bot.use(scenes.mentor_search_scene);
        bot.use(scenes.apprentice_search_scene);

        // Command handlers
        bot.command("start", actions.start);
        bot.command("help", actions.help);
        bot.command("sherik", actions.partner_hears);
        bot.hears("🔍 Sherik kerak", actions.partner_hears);
        bot.command("ish", actions.job_seeker_hears);
        bot.hears("🎯 Ish joyi kerak", actions.job_seeker_hears);
        bot.command("xodim", actions.employee_search_hears);
        bot.hears("👨‍💼 Xodim kerak", actions.employee_search_hears);
        bot.command("ustoz", actions.mentor_search_hears);
        bot.hears("👨‍🏫 Ustoz kerak", actions.mentor_search_hears);
        bot.command("shogird", actions.apprentice_search_hears);
        bot.hears("👨‍🎓 Shogird kerak", actions.apprentice_search_hears);

        // Callback handlers
        bot.callbackQuery("sherik", actions.partner_hears);
        bot.callbackQuery("ish", actions.job_seeker_hears);
        bot.callbackQuery("xodim", actions.employee_search_hears);
        bot.callbackQuery("ustoz", actions.mentor_search_hears);
        bot.callbackQuery("shogird", actions.apprentice_search_hears);

        // Bot commands
        await bot.api.setMyCommands([
            { command: 'start', description: 'Botni ishga tushirish' },
            { command: 'help', description: 'Yordam' },
            { command: 'sherik', description: 'Sherik topish' },
            { command: 'ish', description: 'Ish topish' },
            { command: 'xodim', description: 'Xodim topish' },
            { command: 'ustoz', description: 'Ustoz topish' },
            { command: 'shogird', description: 'Shogird topish' }
        ]);

        // Botni ishga tushirish
        bot.start({
            drop_pending_updates: true,
            onStart: (botInfo) => {
                console.log(`@${botInfo.username} bot muvaffaqiyatli ishga tushdi`);
            },
        });

    } catch (err) {
        console.error('Serverni ishga tushirishda xatolik:', err);
        process.exit(1);
    }
};

// Jarayonni to'xtatish signallarini qayta ishlash
process.on('SIGTERM', xizmatniToxtatis);
process.on('SIGINT', xizmatniToxtatis);

// Serverni ishga tushirish
serverniIshgaTushirish();
