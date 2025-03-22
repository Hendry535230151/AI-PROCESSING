const db = require('../config/db');

const createAiLog = (user_id, file_id, message, response, response_status) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO gemini (user_id, file_id, message, response, response_status) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [user_id, file_id, message, response, response_status], (err, result) => {
            if (err) {
                console.log(1);
                return reject(err);
            }
            if (!result || result.affectedRows === 0) {
                console.log(2);
                resolve(false);
            }
            else {
                console.log(3);
                resolve(true);
            }
        });
    });
};

module.exports = {
    createAiLog,
}