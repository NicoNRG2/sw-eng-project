const ShoppingCart = require('../models/shoppingCart');

// Create a new shopping cart or add items to an existing one
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await ShoppingCart.findOne({ userId });
    
    if (!cart) {
      cart = new ShoppingCart({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove items from the shopping cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await ShoppingCart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update items in the shopping cart
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await ShoppingCart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = req.body.items;
    await cart.save();
    res.status(200).json({ message: 'ok' });
  } catch (error) {
    if (error.kind === 'ObjectId' || error.name === 'CastError') {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Get a shopping cart by user ID
const getCartByUserId = async (req, res) => {
  try {
    const cart = await ShoppingCart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCart,
  getCartByUserId
};