const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const productController = require('../controllers/productController');

// Route to get all products
router.get('/', productController.getAllProducts);

// Route to get a single product by ID
router.get('/:id', productController.getProductById);

// Route to get products by type
router.get('/type/:type', productController.getProductsByType);

// Route to create a new product
router.post('/', productController.createProduct);

// Route to update an existing product
router.put('/:id', productController.updateProduct);

// Route to delete a product
router.delete('/:id', productController.deleteProduct);

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = 'uploads';
      
      //'uploads'
      if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
      }
      
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

const upload = multer({
    storage: storage
});

// Route for uploading a specific product image
router.post('/:id/upload-image', upload.single('image'), productController.uploadProductImage);

module.exports = router;
