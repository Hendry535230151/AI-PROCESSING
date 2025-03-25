require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiModel = require('../models/gemini_model');
const fileModel = require('../models/file_model');
const userModel = require('../models/user_model');
const CustomError = require('../utils/CustomError');
const db = require('../config/db');

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

const aiService = {
    queryGemini: async (user_id, file_id, message) => {
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
            
            let queryType;
            let queryResult;
            
            if (message.toLowerCase().includes("file")) {
                queryType = "file";
            } else if (message.toLowerCase().includes("user")) {
                queryType = "user";
            } else {
                throw new CustomError("Cannot request user query", 400);
            }
            
            if (queryType === "file") {
                queryResult = await fileModel.getFiles();
            } 
            else if (queryType === "user") {
                queryResult = await userModel.getUsers();
            }
            
            const data = queryResult[0];
            
            const queryInfo = queryType === "file"
            ? `File ID: ${data.id}\nNama File: ${data.filename}\nDirektori ID: ${data.directory_id}\nOwner JD: ${data.owner_id}`
            : `User ID: ${data.id}\nNama: ${data.username}\nEmail: ${data.email}`;
            
            const fullPrompt = `${queryInfo}\n\nUser Question: ${message}`;
            
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
            const result = await model.generateContent(fullPrompt);
            
            if (!result || !result.response) {
                throw new CustomError("Failed to get a response from AI", 500);
            }
            
            const response = result.response.text();
            const status = 200;
            await geminiModel.createAiLog(user_id, file_id, message, response, status);
            
            return response;
        } catch (err) {
            throw new CustomError(err.message, 500);
        }
    }
};

module.exports = aiService;
