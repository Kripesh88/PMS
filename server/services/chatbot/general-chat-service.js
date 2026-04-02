const aiService = require('./ai-service');

module.exports = async (message) => {
  return await aiService.askAI(message);
};
