/**
 * CareerOrbit AI — OpenAI Integration Client (Simulated)
 * Simulates communication with OpenAI's GPT-4o and Embedding models.
 * Features: Mock latency, token usage tracking, and model selection.
 */

const logger = require("../middleware/requestLogger");

class OpenAIClient {
  constructor() {
    this.model = "gpt-4o-2024-08-06";
    this.embeddingModel = "text-embedding-3-small";
    this.latencyRange = { min: 800, max: 2500 };
  }

  /**
   * Simulates a chat completion request for AI recommendations.
   */
  async generateCompletion(prompt, systemPrompt = "You are an expert career counselor.") {
    const latency = Math.floor(Math.random() * (this.latencyRange.max - this.latencyRange.min)) + this.latencyRange.min;
    
    logger.info(`[AI-INTEGRATION] Calling OpenAI ${this.model} | Prompt Length: ${prompt.length}`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        logger.info(`[AI-INTEGRATION] OpenAI Request Completed | Latency: ${latency}ms | Tokens: 452`);
        resolve({
          id: "chatcmpl-" + Math.random().toString(36).substring(7),
          model: this.model,
          usage: { prompt_tokens: prompt.length / 4, completion_tokens: 350, total_tokens: 350 + (prompt.length / 4) },
          choices: [{ message: { content: "Simulated AI Intelligence Response" } }]
        });
      }, latency);
    });
  }

  /**
   * Simulates generating vector embeddings for skill mapping.
   */
  async generateEmbeddings(text) {
    logger.info(`[AI-INTEGRATION] Generating Embeddings | Model: ${this.embeddingModel}`);
    return new Array(1536).fill(0).map(() => Math.random());
  }
}

module.exports = new OpenAIClient();
