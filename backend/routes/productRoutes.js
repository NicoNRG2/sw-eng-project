const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/', productController.getAllProducts);

// Other routes to handle CRUD operations on products
// ...

module.exports = router;
