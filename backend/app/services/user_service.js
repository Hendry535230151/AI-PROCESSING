require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userModel = require('../models/user_model');
const CustomError = require('../utils/CustomError');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!.\-])[A-Za-z\d@#$%^&*!.\-]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const secret_key = process.env.JWT_SECRET_KEY;

const getUsers = async () => {
    try {
        const users = await userModel.getUsers();
        if (!users) {
            throw new CustomError('Users not found', 400)
        }
        return users;
    }
    catch (err) {
        throw new CustomError(err.message, 500);
    }
}

const getUserById = async (id) => {
    try {
        if (!id) {
            throw new CustomError("User id is required", 400);
        }
        
        const user = await userModel.getUserById(id);
        if (!user) {
            throw new CustomError(`User with id: ${id}, not found`, 404);
        }
        return user;
    }
    catch (err) {
        throw new CustomError(err.message, 500);
    }
};

const getUserByName = async (name) => {
    try {
        if (!name) {
            throw new CustomError('User name is required', 400);
        }

        const user = await userModel.getUserByName(name);
        if (!user) {
            throw new CustomError(`User with name: ${name}, not found`, 404);
        }
        return user;
    }
    catch (err) {
        throw new CustomError(err.message, 500);
    }
};

const createUser = async (username, email, password, passwordConfirm) => {
    try {
        const errors = [];
        if (!username) {
            errors.push('Username is required');
        }
        if (!email) {
            errors.push('Email is required');
        }
        if (!password) {
            errors.push('Password is required');
        }
        if (!passwordConfirm) {
            errors.push('passwordConfirm is required');
        }
        if (password != passwordConfirm) {
            errors.push('Password do not match');
        }
        if (!passwordRegex.test(password)) {
            errors.push('Password format incorrect');
        }
        if (!emailRegex.test(email)){
            errors.push('Email format incorrect');
        }
        if (errors.length > 0) {
            throw new CustomError(errors, 400);
        }

        const checkEmail = await userModel.getUserByEmail(email);
        if (checkEmail) {
            throw new CustomError('Email already taken', 404);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await userModel.createUser(username, email, hashedPassword);
        if (!user) {
            throw new CustomError('Failed to create user', 500)
        }

        return user;
    }
    catch (err) {
        throw new CustomError(err.message, 500);
    }
};

const loginUser = async (email, password) => {
    try {
        const errors = [];
        if (!email) {
            errors.push('Email is required');
        }
        if (!password) {
            errors.push('Password is required');
        }
        if (!passwordRegex.test(password)) {
            errors.push('Password format incorrect');
        }
        if (!emailRegex.test(email)){
            errors.push('Email format incorrect');
        }
        if (errors.length > 0) {
            throw new CustomError(errors, 400);
        }
        
        const user = await userModel.getUserByEmail(email);
        if (!user) { 
            throw new CustomError(`User with email: ${email} not found`, 404);
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw new CustomError('Invalid password', 401);
        } 

        return jwt.sign(
            { id: user.id, email: user.email },
            secret_key,
            { expiresIn: '2h' }
        );
    } catch (err) {
        throw new CustomError(err.message, 500);
    };
};

const updateUserPassword = async (email, password, passwordConfirm) => {
    try {
        const errors = [];
        if (!email) {
            errors.push('Email is required');
        }
        if (!password) {
            errors.push('Password is required');
        }
        if (!passwordConfirm) {
            errors.push('Password confirm is required');
        }
        if (password != passwordConfirm) {
            errors.push('Password do not match');
        }
        if (!passwordRegex.test(password)) {
            errors.push('Password format incorrect');
        }
        if (!emailRegex.test(email)){
            errors.push('Email format incorrect');
        }
        if (errors.length > 0) {
            throw new CustomError(errors, 400);
        }
        
        const checkEmail = await userModel.getUserByEmail(email);
        if (!checkEmail) {
            throw new CustomError('Email not found', 404);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await userModel.updateUserPassword(email, hashedPassword);
        if (!user) {
            throw new CustomError('Failed to update user password', 500)
        }

        return user;
    }
    catch(err) {
        throw new CustomError(err.message, 500);
    }
};

const deleteUser = async (id) => {
    try {
        if (!id) {
            throw new CustomError('ID is required', 400);
        }

        const checkUser = await userModel.getUserById(id);
        if (!checkUser) {
            throw new CustomError(`User with id: ${id}, not found`, 404);
        }
        
        const user = await userModel.deleteUser(id);
        if (!user) {
            throw new CustomError('Failed to delete user', 500)
        }

        return user;
    } 
    catch (err) {
        throw new CustomError(err.message, 500);
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