const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');

// Route to add items to the shopping cart
router.post('/add', shoppingCartController.addToCart);

// Route to remove items from the shopping cart
router.post('/remove', shoppingCartController.removeFromCart);

// Route to create a new shopping cart
router.post('/', shoppingCartController.createCart);

// Route to update items in the shopping cart
router.put('/:id', shoppingCartController.updateCart);

// Route to get a shopping cart by user ID
router.get('/user/:userId', shoppingCartController.getCartByUserId);

module.exports = router;