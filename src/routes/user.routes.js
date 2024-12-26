const { Router } = require('express');
const { User } = require('../models/user.model.js');
const NodeCache = require('node-cache');
const mongoose = require('mongoose');

const router = Router();
const cache = new NodeCache({ stdTTL: 300 }); // 5 daqiqalik kesh

// ID tekshirish uchun middleware
const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ xato: "Noto'g'ri ID formati" });
  }
  next();
};

// Barcha foydalanuvchilarni olish
router.get("/", async (req, res) => {
  try {
    const cachedUsers = cache.get("all_users");
    if (cachedUsers) {
      return res.status(200).json({
        xabar: "Muvaffaqiyatli",
        malumot: cachedUsers,
        keshdan: true
      });
    }

    const users = await User.find().select('-__v').lean();
    cache.set("all_users", users);
    
    res.status(200).json({
      xabar: "Muvaffaqiyatli",
      malumot: users,
      keshdan: false
    });
  } catch (error) {
    console.error("Foydalanuvchilarni olishda xato:", error);
    res.status(500).json({
      xato: "Serverda xatolik yuz berdi",
      tafsilotlar: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ID bo'yicha foydalanuvchini olish
router.get("/:id", validateId, async (req, res) => {
  try {
    const cacheKey = `user_${req.params.id}`;
    const cachedUser = cache.get(cacheKey);
    
    if (cachedUser) {
      return res.status(200).json({
        xabar: "Muvaffaqiyatli",
        malumot: cachedUser,
        keshdan: true
      });
    }

    const user = await User.findById(req.params.id).select('-__v').lean();
    if (!user) {
      return res.status(404).json({ xato: "Foydalanuvchi topilmadi" });
    }

    cache.set(cacheKey, user);
    res.status(200).json({
      xabar: "Muvaffaqiyatli",
      malumot: user,
      keshdan: false
    });
  } catch (error) {
    console.error("Foydalanuvchini olishda xato:", error);
    res.status(500).json({
      xato: "Serverda xatolik yuz berdi",
      tafsilotlar: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Foydalanuvchini o'chirish
router.delete("/:id", validateId, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ xato: "Foydalanuvchi topilmadi" });
    }

    // Keshdan o'chirish
    cache.del(`user_${req.params.id}`);
    cache.del("all_users");

    res.status(200).json({
      xabar: "O'chirildi",
      malumot: user
    });
  } catch (error) {
    console.error("Foydalanuvchini o'chirishda xato:", error);
    res.status(500).json({
      xato: "Serverda xatolik yuz berdi",
      tafsilotlar: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Foydalanuvchi ma'lumotlarini yangilash
router.patch("/:id", validateId, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!user) {
      return res.status(404).json({ xato: "Foydalanuvchi topilmadi" });
    }

    // Keshni tozalash
    cache.del(`user_${req.params.id}`);
    cache.del("all_users");

    res.status(200).json({
      xabar: "Yangilandi",
      malumot: user
    });
  } catch (error) {
    console.error("Foydalanuvchini yangilashda xato:", error);
    res.status(500).json({
      xato: "Serverda xatolik yuz berdi",
      tafsilotlar: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
