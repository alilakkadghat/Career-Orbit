const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

// @route POST /api/chatbot/message
// @desc  Send a message to Gemini-powered Orbit AI
router.post("/message", chatbotController.sendMessage);

module.exports = router;
