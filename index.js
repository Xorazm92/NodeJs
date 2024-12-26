import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import rateLimit from "express-rate-limit";
import winston from "winston";
import routes from "./src/routes/index.routes.js";

export * from "./src/core/index.js";
export * from "./src/actions/index.js";

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

const app = express();

// Xavfsizlik uchun middleware
app.use(helmet());
app.use(cors());

// So'rovlar sonini cheklash
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 100 // har bir IP uchun 15 daqiqada 100 ta so'rov
});
app.use(limiter);

// Siqish middleware
app.use(compression());

// So'rov tanasini tahlil qilish uchun middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// So'rovlarni qayd qilish middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// API yo'nalishlari
app.use("/api/v1", routes);

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
