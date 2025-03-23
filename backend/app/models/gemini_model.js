const db = require('../config/db');

const createAiLog = (user_id, file_id, message, response, response_status) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO gemini (user_id, file_id, message, response, response_status) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [user_id, file_id, message, response, response_status], (err, result) => {
            if (err) {
                return reject(err);
            }
            if (!result || result.affectedRows === 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
};

module.exports = {
    createAiLog,
}