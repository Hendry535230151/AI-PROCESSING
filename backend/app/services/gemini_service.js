require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const CustomError = require('../utils/CustomError');

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

const queryGemini = async (message) => {
    try {
        if (!message) {
            throw new CustomError('Message is required', 400);
        }
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const result = await model.generateContent(message);
        const response = result.response.text();
        
        return response;
    } catch (err) {
        throw new CustomError(err.message, 500);
    }
};

module.exports = { 
    queryGemini
};
