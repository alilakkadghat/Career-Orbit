/**
 * CareerOrbit AI — Google Gemini Integration Client
 * Replaces the simulated OpenAI client with real Gemini AI.
 * Uses: gemini-1.5-flash (fast + free tier friendly)
 */

const https = require("https");
const logger = require("../middleware/requestLogger");

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_API_BASE = "generativelanguage.googleapis.com";

class GeminiClient {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.model = GEMINI_MODEL;

    if (!this.apiKey) {
      logger.warn(
        "[GEMINI] GEMINI_API_KEY not set in .env — AI features will return fallback responses."
      );
    }
  }

  /**
   * Core method: sends a prompt to Gemini and returns the text response.
   * @param {string} prompt - The user/system prompt
   * @param {string} systemInstruction - Optional system-level instruction
   * @returns {Promise<string>} - Gemini's response text
   */
  async generateContent(prompt, systemInstruction = "") {
    if (!this.apiKey) {
      return this._fallbackResponse(prompt);
    }

    const body = JSON.stringify({
       contents: [
        {
          parts: [{ 
            text: systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt 
          }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    return new Promise((resolve, reject) => {
      const path = `/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

      const options = {
        hostname: GEMINI_API_BASE,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);

            if (parsed.error) {
              logger.error(`[GEMINI] API Error: ${parsed.error.message}`);
              resolve(this._fallbackResponse(prompt));
              return;
            }

            const text =
              parsed?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            logger.info(
              `[GEMINI] Response received | Model: ${this.model} | Length: ${text.length} chars`
            );
            resolve(text);
          } catch (err) {
            logger.error(`[GEMINI] Parse error: ${err.message}`);
            resolve(this._fallbackResponse(prompt));
          }
        });
      });

      req.on("error", (err) => {
        logger.error(`[GEMINI] Request failed: ${err.message}`);
        resolve(this._fallbackResponse(prompt));
      });

      req.write(body);
      req.end();
    });
  }

  /**
   * Career-specific chat completion (used by chatbot).
   */
  async chatCompletion(userMessage, conversationHistory = [], chatMode = 'mentor', resumeText = '') {
    let systemInstruction = '';
    
    if (chatMode === 'mock_interview') {
      systemInstruction = `You are a strict technical interviewer conducting a mock interview with a student for their target role.
Your goal is to test their knowledge based entirely on their resume. Ask challenging technical questions and evaluate their responses.
Keep responses concise, realistic, and conversational. Do not break character. Do not use markdown like ** or ##.
RESUME CONTEXT:
${resumeText.substring(0, 3000)}`;
    }
    else if (chatMode === 'salary_negotiator') {
      systemInstruction = `You are a tough, no-nonsense HR manager at a top tech company negotiating salary with a candidate based on their resume.
Your goal is to push back firmly on their salary expectations, ask for justifications, and stress-test their negotiation skills.
Keep responses concise, sharp, and conversational. Never break character. Do not use markdown like ** or ##.
RESUME CONTEXT:
${resumeText.substring(0, 3000)}`;
    }
    else {
      systemInstruction = `You are Orbit AI, a smart and friendly career mentor for college students in India. 
You specialize in campus placements, internships, tech skills, and career transitions.
Keep responses concise (3-5 sentences max), actionable, and encouraging.
Use Indian context where relevant (FAANG, service companies, startups, IITs, NITs, etc.).
Do NOT use markdown formatting like ** or ## — respond in plain conversational text.`;
    }

    // Build conversation context if history exists
    let fullPrompt = userMessage;
    if (conversationHistory.length > 0) {
      const historyText = conversationHistory
        .slice(-6) // last 3 exchanges
        .map((m) => `${m.role === "user" ? "Student" : "Orbit AI"}: ${m.text}`)
        .join("\n");
      fullPrompt = `Previous conversation:\n${historyText}\n\nStudent: ${userMessage}`;
    }

    return this.generateContent(fullPrompt, systemInstruction);
  }

  /**
   * Resume roast/analysis (used by resume parser).
   * @param {string} resumeText - Extracted text from resume PDF
   * @param {string} targetRole - Student's target role/internship
   */
  async roastResume(resumeText, targetRole = "Software Engineering internship") {
    const systemInstruction = `You are a brutally honest but supportive senior engineer reviewing a student's resume for campus placements. 
Your job is to give a "roast" — point out weaknesses clearly, but also highlight strengths and give specific, actionable improvements.
Be direct, a little funny, but genuinely helpful. Use Indian campus placement context.
Structure your response in 3 sections: STRENGTHS, WEAKNESSES (the roast), and QUICK FIXES.
Keep total response under 300 words. No markdown formatting.`;

    const prompt = `Review this student resume for a ${targetRole} role:\n\n${resumeText.substring(0, 3000)}`;
    return this.generateContent(prompt, systemInstruction);
  }

  /**
   * Skill obsolescence analysis.
   * @param {string[]} skills - Array of skill names
   * @param {string} targetRole - Target career role
   */
  async analyzeSkillObsolescence(skills, targetRole = "Software Engineer") {
    const systemInstruction = `You are a tech industry analyst specializing in skill market trends.
Analyze the provided skills and identify which ones are becoming obsolete, which are stable, and which are high-growth.
Be specific with timeframes. Use Indian tech job market context (TCS, Infosys, Wipro vs product companies).
Return ONLY a JSON array — no other text, no markdown, no explanation outside the JSON.`;

    const prompt = `Analyze these skills for a ${targetRole} role and return a JSON array:
Skills: ${skills.join(", ")}

Return this exact JSON structure:
[
  {
    "skill": "skill name",
    "status": "obsolete|declining|stable|growing|hot",
    "obsolescenceRisk": 0-100,
    "yearsRelevant": "estimated years still relevant",
    "recommendation": "one sentence action"
  }
]`;

    const raw = await this.generateContent(prompt, systemInstruction);
    try {
      // Strip any accidental markdown code fences
      const cleaned = raw.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      logger.warn("[GEMINI] Could not parse skill JSON, returning raw text");
      return null;
    }
  }

  /**
   * Stipend benchmarking analysis.
   */
  async analyzeStipend(role, company, stipendAmount, location, skills) {
    const systemInstruction = `You are a compensation analyst for Indian student internships and campus placements.
Provide realistic stipend benchmarks based on role, company tier, location, and skills.
Use current Indian market data. Be specific with numbers in INR.
Return ONLY valid JSON — no markdown, no extra text.`;

    const prompt = `Analyze this internship stipend offer:
Role: ${role}
Company: ${company || "Unknown Company"}
Offered Stipend: ₹${stipendAmount}/month
Location: ${location || "Bangalore"}
Student Skills: ${skills ? skills.join(", ") : "Not specified"}

Return this exact JSON:
{
  "verdict": "below_market|fair|above_market|excellent",
  "marketRange": { "min": number, "max": number, "median": number },
  "percentile": number,
  "analysis": "2-3 sentence analysis",
  "negotiationTip": "specific negotiation advice",
  "companyTierBenchmark": "what this company tier typically pays"
}`;

    const raw = await this.generateContent(prompt, systemInstruction);
    try {
      const cleaned = raw.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      logger.warn("[GEMINI] Could not parse stipend JSON");
      return null;
    }
  }

  /**
   * Fallback response when API key is missing or call fails.
   */
  _fallbackResponse(prompt) {
    logger.warn("[GEMINI] Using fallback response — API key missing or error");
    return "I'm having trouble connecting to my AI engine right now. Please check that GEMINI_API_KEY is set in your .env file, or try again in a moment.";
  }
}

module.exports = new GeminiClient();
