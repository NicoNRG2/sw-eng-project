const express = require('express');
const {
  getCartById,
  updateCart,
  deleteCart
} = require('../controllers/shoppingCartController');

const router = express.Router();

router.get('/:id', getCartById);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

module.exports = router;
