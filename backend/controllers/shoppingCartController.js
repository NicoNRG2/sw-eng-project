const ShoppingCart = require('../models/shoppingCart');

// Function to get a single shopping cart by ID
const getCartById = async (req, res) => {
  try {
    const cart = await ShoppingCart.findById(req.params.id).populate('products');
    if (cart == null) {
      return res.status(404).json({ message: 'Shopping cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update an existing shopping cart
const updateCart = async (req, res) => {
  try {
    const cart = await ShoppingCart.findById(req.params.id);
    if (cart == null) {
      const cart = new ShoppingCart({
        quantities: req.body.quantities,
        products: req.body.products
      });

      const newCart = await cart.save();
      res.status(201).json(newCart);
      return;
    }

    if (req.body.quantities != null) {
      cart.quantities = req.body.quantities;
    }
    if (req.body.products != null) {
      cart.products = req.body.products;
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a shopping cart
const deleteCart = async (req, res) => {
  try {
    const cart = await ShoppingCart.findById(req.params.id);
    if (cart == null) {
      return res.status(404).json({ message: 'Shopping cart not found' });
    }

    await cart.remove();
    res.json({ message: 'Shopping cart deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCartById,
  updateCart,
  deleteCart
};