const express = require('express');
const adsRouter = require("./ads.routes.js");
const userRouter = require("./user.routes.js");

const router = express.Router();

router.use("/ads", adsRouter);
router.use("/users", userRouter);

// API endpoints
router.get('/', (req, res) => {
    res.json({ message: 'API is working' });
});

module.exports = router;
