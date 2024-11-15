const express = require('express');
const { addSocial, getSocials, updateSocial, deleteSocial, getSocialById } = require('../controllers/social.controller');

const router = express.Router();

router.post('/create', addSocial)
router.get("/get", getSocials);
router.put("/update/:id", updateSocial);
router.delete("/delete/:id", deleteSocial);
router.get('/:id', getSocialById);


module.exports = router;