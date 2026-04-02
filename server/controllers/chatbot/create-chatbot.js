const chatbotService = require('../../services/chatbot/create-chatbot');

module.exports = async (req, res, next) => {
  try {
    const { message, userId } = req.body;

    const user = req.user || { id: userId || 1 };

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    const reply = await chatbotService({ message, user });

    return res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    next(error);
  }
};
