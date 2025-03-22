const { queryGemini } = require("../services/gemini_service");

const chatWithGemini = async (req, res) => {
    const { message } = req.body;
    try {
        const response = await queryGemini(message);
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { 
    chatWithGemini 
};
