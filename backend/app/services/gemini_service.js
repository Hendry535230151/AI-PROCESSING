require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiModel = require('../models/gemini_model');
const CustomError = require('../utils/CustomError');

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

const queryGemini = async (user_id, file_id, message) => {
    try {
        const errors = [];
        if (!user_id) {
            errors.push('User id is required');
        }
        if (!message) {
            errors.push('Message is required');
        }
        if (errors.length > 0) {
            throw new CustomError(errors, 400);
        }
    
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const result = await model.generateContent(message);
        
        if (!result || !result.response) {
            throw new CustomError("Failed to get a response from AI", 500);
        }
        
        const response = result.response.text();
        const status = 200;
        const log = await geminiModel.createAiLog(user_id, file_id, message, response, status);

        return response;
    } catch (err) {
        throw new CustomError(err.message, 500);
    }
};

module.exports = { 
    queryGemini,
};
