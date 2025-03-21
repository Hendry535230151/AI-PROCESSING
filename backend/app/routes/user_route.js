const express = require('express');
const userController = require('../controller/user_controller');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.get('/name/:name', userController.getUserByName);
router.post('/', userController.createUser);
router.put('/update-password', userController.updateUserPassword);
router.delete('/:id', userController.deleteUser);

module.exports = router;
