const express = require('express');
const router = express.Router();
const multer = require('multer');
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

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

/*
router.post('/:productId/upload-image', upload.single('image'), async (req, res) => {
    const productId = req.params._id;
    const imagePath = req.file.path;

    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).send('Product not found');
        }

        product.images.push(imagePath);
        await product.save();

        res.status(200).send({
            message: 'Image uploaded successfully', product
        });
    
    } catch(error){
        res.status(500).send({
            message: 'Error uploading image', error
        });
    }
});*/

module.exports = router;
