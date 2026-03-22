/**
 * CareerOrbit AI — Gemini-Powered Chatbot Controller
 * Replaces hardcoded keyword responses with real Gemini AI.
 */

const gemini = require("../integrations/GeminiClient");
const response = require("../utils/responseFormatter");
const logger = require("../middleware/requestLogger");

/**
 * POST /api/chatbot/message
 * Body: { message: string, history: [{role, text}] }
 */
exports.sendMessage = async (req, res) => {
  const { message, history = [], chatMode = 'mentor', resumeText = '' } = req.body;

  if (!message || !message.trim()) {
    return response.error(res, "Message is required", 400, "EMPTY_MESSAGE");
  }

  logger.info(`[CHATBOT] Incoming message: "${message.substring(0, 60)}..."`);

  try {
    const aiReply = await gemini.chatCompletion(message.trim(), history, chatMode, resumeText);

    return response.success(res, {
      reply: aiReply,
      timestamp: new Date().toISOString(),
      model: "gemini-1.5-flash",
    });
  } catch (err) {
    logger.error(`[CHATBOT] Error: ${err.message}`);
    return response.error(res, "AI service temporarily unavailable", 503, "AI_ERROR");
  }
};
