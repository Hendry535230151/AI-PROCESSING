const { queryGemini } = require("../services/gemini_service");

const chatWithGemini = async (req, res) => {
    const { user_id } = req.params;
    const { file_id, message } = req.body;
    try {
        const response = await queryGemini(user_id, file_id, message);
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { 
    chatWithGemini,
};
