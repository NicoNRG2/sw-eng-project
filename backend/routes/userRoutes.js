const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a user by id
router.get('/:id', userController.getUserById);

// Route to create a new user
router.post('/', userController.createUser);

// Route to update a user
router.put('/:id', userController.updateUser);

// Route to delete a user
router.delete('/:id', userController.deleteUser);

// Route to authenticate a user
router.post('/login', userController.loginUser);

// Example of a protected route
router.get('/protected', userController.protectRoute, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;
