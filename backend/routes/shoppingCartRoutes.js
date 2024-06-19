const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: ShoppingCart
 *   description: Shopping Cart management
 */

/**
 * @swagger
 * /shopping-cart/add:
 *   post:
 *     summary: Add items to the shopping cart
 *     tags: [ShoppingCart]
 *     description: Add items to the shopping cart for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Items added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       400:
 *         description: Bad request
 *     security:
 *       - bearerAuth: []
 */
router.post('/add', userController.protectRoute, shoppingCartController.addToCart);

/**
 * @swagger
 * /shopping-cart/remove:
 *   post:
 *     summary: Remove items from the shopping cart
 *     tags: [ShoppingCart]
 *     description: Remove items from the shopping cart for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Items removed from the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       404:
 *         description: Cart not found
 *       400:
 *         description: Bad request
 *     security:
 *       - bearerAuth: []
 */
router.post('/remove', userController.protectRoute, shoppingCartController.removeFromCart);

/**
 * @swagger
 * /shopping-cart/{id}:
 *   put:
 *     summary: Update items in the shopping cart
 *     tags: [ShoppingCart]
 *     description: Update items in the shopping cart for a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingCart'
 *     responses:
 *       200:
 *         description: The updated shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       404:
 *         description: Cart not found
 *       400:
 *         description: Bad request
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', userController.protectRoute, shoppingCartController.updateCart);

/**
 * @swagger
 * /shopping-cart/user/{userId}:
 *   get:
 *     summary: Get a shopping cart by user ID
 *     tags: [ShoppingCart]
 *     description: Retrieve a shopping cart by the user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       404:
 *         description: Cart not found
 */
router.get('/user/:userId', shoppingCartController.getCartByUserId);

module.exports = router;
