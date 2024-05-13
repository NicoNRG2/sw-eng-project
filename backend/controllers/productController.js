const Product = require('../models/product');

// Function to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other functions to handle CRUD operations on products
// ...

module.exports = { getAllProducts };
