const detectIntent = require('./intent-service');
const handleGeneralChat = require('./general-chat-service');
const handleAvailability = require('./appointment-service');

const chatbotService = async ({ message, user }) => {
  let intent;

  try {
    intent = await detectIntent(message);
  } catch (err) {
    console.error('Intent detection failed:', err);
    intent = 'GENERAL_QUERY';
  }

  //  ONLY availability check
  if (intent === 'CHECK_AVAILABILITY') {
    return await handleAvailability(message);
  }

  //  Everything else → AI
  return await handleGeneralChat(message);
};

module.exports = chatbotService;
