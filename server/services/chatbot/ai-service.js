




const axios = require('axios');

module.exports.askAI = async (message) => {
  try {
    console.log("Calling Ollama...");

    const response = await axios({
      method: 'post',
      url: 'http://127.0.0.1:11434/api/generate', 
      data: {
        model: 'phi3',
        prompt: `Pet assistant: ${message}`,
        stream: false,
        options: {
          num_predict: 80,
          temperature: 0.7,
        }
      },
      timeout: 0, 
    });

    console.log("Ollama response received");

    return response.data.response;

  } catch (error) {
    console.error("Ollama ERROR FULL:", error);

    return "AI is currently unavailable.";
  }
};