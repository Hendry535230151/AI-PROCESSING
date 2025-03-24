const db = require('../config/db');

const fileModel = {
    getFiles: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM files'
            db.query(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (!result || result.length === 0) {
                    resolve(null);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    getFileById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM files WHERE id = ?'
            db.query(query, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (!result || result.length === 0) {
                    resolve(null);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    getFileByDirectory: (directory_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM files WHERE directory_id = ?'
            db.query(query, [directory_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (!result || result.length === 0) {
                    resolve(null);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    createFile: (owner_id, directory_id, filename, file) => {
        return new Promise((resolve, reject) => {
            const fileBuffer = Buffer.from(file, 'base64');
            const query = 'INSERT INTO files (owner_id, directory_id, filename, file) VALUES (?, ?, ?, ?)';
            db.query(query, [owner_id, directory_id, filename, fileBuffer], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (!result || result.affectedRows === 0) {
                    resolve(null);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    renameFile: (id, newName) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE files SET filename = ? WHERE id = ?';
            db.query(query, [newName, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (!result || result.affectedRows === 0) {
                    resolve(null);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    changeFileToOTherDirectory: (directory_id, id) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE files SET directory_id = ? WHERE id  = ?';
            db.query(query, [directory_id, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (!result || result.affectedRows === 0) {
                    resolve(null);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    deleteFile: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM files WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (!result || result.affectedRows === 0) {
                    resolve(null);
                }
                else {
                    resolve(result);
                }
            });
        });
    },
};

module.exports = fileModel;