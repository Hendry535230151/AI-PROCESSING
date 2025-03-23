const userService = require('../services/user_service');

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
};

const getUserByName = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await userService.getUserByName(name);
        res.status(200).json(user);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, email, password, passwordConfirm } = req.body;
        await userService.createUser(username, email, password, passwordConfirm);
        res.status(201).json({ message: "Success to create user"});
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        res.status(200).json({ message: 'Success to login', token: user});
    }
    catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
}

const updateUserPassword = async (req, res) => {
    try {
        const { email, password, passwordConfirm } = req.body;
        await userService.updateUserPassword(email, password, passwordConfirm);
        res.status(200).json({ message: 'Success to update password'});
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(200).json({ message: 'Success to delete user' });
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    getUserByName,
    loginUser,
    createUser,
    updateUserPassword,
    deleteUser
};
