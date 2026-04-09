const express = require('express');
const router = express.Router();
const chatBotController = require('../../controllers/chatbot');
// const authMiddleware= require('../../middleware/auth-middleware');
// Groomer

// chatBot routes

router.route('/create').post(chatBotController.createChatBot);

module.exports = router;
