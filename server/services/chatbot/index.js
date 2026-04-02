const createChatBot = require('./create-chatbot');
const intentService = require('./intent-service');
const generalChatService = require('./general-chat-service');
const appointmentChatService = require('./appointment-service');
const bookingFlowService = require('./booking-flow-service');
const aiService = require('./ai-service');
module.exports = {
  createChatBot,
  intentService,
  generalChatService,
  appointmentChatService,
  bookingFlowService,
  aiService,
};
