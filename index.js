const express = require('express');
const mongoose = require('mongoose');
const { config } = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const routes = require('./src/routes/index.routes.js');
const { bot } = require('./src/core/bot.js');

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

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Express ilovasini yaratish
const app = express();

// Middleware'larni sozlash
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// So'rovlar sonini cheklash
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routelarni ulash
app.use("/api/v1", routes);

// So'rovlarni qayd qilish middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Xatolarni qayta ishlash middleware
app.use((err, req, res, next) => {
  logger.error('Kutilmagan xato:', err);
  res.status(500).json({
    xato: 'Serverda xatolik yuz berdi',
    tafsilotlar: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// MongoDB ulanish parametrlari
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  maxPoolSize: 50
};

const port = process.env.PORT || 5001;
const dbUrl = process.env.DATABASE_URI;

let server;

const xizmatniToxtatis = async () => {
  logger.info('Toxtatish signali qabul qilindi. Xizmatni to\'xtatish boshlandi...');
  
  if (server) {
    await new Promise((resolve) => server.close(resolve));
    logger.info('HTTP server to\'xtatildi');
  }
  
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    logger.info('MongoDB ulanishi yopildi');
  }
  
  process.exit(0);
};

const serverniIshgaTushirish = async () => {
  try {
    await mongoose.connect(dbUrl, mongooseOptions);
    logger.info("MongoDB-ga ulandi");

    server = app.listen(port, () => {
      logger.info(`Server ${port}-portda ishga tushdi`);
      logger.info(`Muhit: ${process.env.NODE_ENV}`);
    });

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
    bot.start();

    // Jarayonni to'xtatish signallarini qayta ishlash
    process.on('SIGTERM', xizmatniToxtatis);
    process.on('SIGINT', xizmatniToxtatis);

    // Kutilmagan xatolarni qayta ishlash
    process.on('uncaughtException', (error) => {
      logger.error('Kutilmagan xato:', error);
      xizmatniToxtatis();
    });

    // Qayta ishlanmagan va'dalarni qayta ishlash
    process.on('unhandledRejection', (error) => {
      logger.error('Qayta ishlanmagan rad etish:', error);
      xizmatniToxtatis();
    });

  } catch (error) {
    logger.error('Serverni ishga tushirishda xato:', error);
    process.exit(1);
  }
};

serverniIshgaTushirish();
