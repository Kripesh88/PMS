const express = require('express');
const router = express.Router();
const chatBotController = require('../../controllers/chatbot');

// Groomer

// chatBot routes

router.route('/create').post(chatBotController.createChatBot);

module.exports = router;
