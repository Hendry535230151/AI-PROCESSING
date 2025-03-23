const db = require('../config/db');

const getUsers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';
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
};

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
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
};

const getUserByName = (name) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username LIKE ?'
        db.query(query, [`%${name}%`], (err, result) => {
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
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err ,result) => {
            if (err) {
                return reject(err);
            }
            if (!result || result.length === 0) {
                resolve(null);
            }
            else {
                resolve(result[0]);
            }
        });
    });
} ;

const createUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, password], (err, result) => {
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

const updateUserPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET password = ? WHERE email = ?';
        db.query(query, [password, email], (err, result) => {
            if (err) {
                return reject(err)
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

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err)
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
    getUsers,
    getUserById,
    getUserByName,
    getUserByEmail,
    createUser,
    updateUserPassword,
    deleteUser,
};