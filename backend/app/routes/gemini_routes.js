const express = require('express');
const { chatWithGemini } = require('../controller/gemini_controller');

const router = express.Router();

router.post('/chat', chatWithGemini);

module.exports = router;
