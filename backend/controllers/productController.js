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

// Function to get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a new product
const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    ingredients: req.body.ingredients,
    price: req.body.price,
    availability: req.body.availability,
    images: req.body.images,
    vegan: req.body.vegan,
    gluten_free: req.body.gluten_free
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to update an existing product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.body.name != null) {
      product.name = req.body.name;
    }
    if (req.body.category != null) {
      product.category = req.body.category;
    }
    if (req.body.ingredients != null) {
      product.ingredients = req.body.ingredients;
    }
    if (req.body.price != null) {
      product.price = req.body.price;
    }
    if (req.body.availability != null) {
      product.availability = req.body.availability;
    }
    if (req.body.images != null) {
      product.images = req.body.images;
    }
    if (req.body.vegan != null) {
      product.vegan = req.body.vegan;
    }
    if (req.body.gluten_free != null) {
      product.gluten_free = req.body.gluten_free;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
