const request = require('supertest');
const app = require('../app'); 
const Product = require('../models/product');

jest.mock('../models/product');

describe('Product API', () => {
  let mockProduct;

  beforeEach(() => {
    mockProduct = {
      _id: '1',
      name: 'Test Product',
      category: 'Bread',
      ingredients: ['flour', 'water', 'yeast'],
      price: 5,
      availability: true,
      images: ['test.jpg'],
      vegan: false,
      gluten_free: false
    };
  });

  //try to configure mock products

  beforeEach(() => {
        Product.find.mockResolvedValue([mockProduct]);
        Product.findById.mockResolvedValue(mockProduct);
        Product.deleteOne.mockResolvedValue({ deletedCount: 1 });
        Product.prototype.save.mockResolvedValue(mockProduct);
      });

  describe('GET /products', () => {
    it('should return all products', async () => {
      Product.find.mockResolvedValue([mockProduct]);
      const res = await request(app).get('/products');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([mockProduct]);
    });
  });

  describe('GET /products/:id', () => {
    it('should return a single product by ID', async () => {
      Product.findById.mockResolvedValue(mockProduct);
      const res = await request(app).get('/products/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockProduct);
    });

    it('should return 404 if product not found', async () => {
      Product.findById.mockResolvedValue(null);
      const res = await request(app).get('/products/1');
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Product not found');
    });
  });

  describe('GET /products/type/:type', () => {
    it('should return products by type', async () => {
      Product.find.mockResolvedValue([mockProduct]);
      const res = await request(app).get('/products/type/Bread');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([mockProduct]);
    });
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      Product.prototype.save.mockResolvedValue(mockProduct);
      const res = await request(app).post('/products').send(mockProduct);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockProduct);
    });
  });

  describe('PUT :id', () => {
    it('should update an existing product', async () => {
      Product.findById.mockResolvedValue(mockProduct);
      Product.prototype.save.mockResolvedValue(mockProduct);
      const res = await request(app).put('/products/1').send(mockProduct);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockProduct);
    });

    it('should return 404 if product not found', async () => {
      Product.findById.mockResolvedValue(null);
      const res = await request(app).put('/products/1').send(mockProduct);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Product not found');
    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete a product', async () => {
      Product.findById.mockResolvedValue(mockProduct);
      Product.deleteOne.mockResolvedValue({ deletedCount: 1 });
      const res = await request(app).delete('/products/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Product deleted successfully');
    });

    it('should return 404 if product not found', async () => {
      Product.findById.mockResolvedValue(null);
      const res = await request(app).delete('/products/1');
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Product not found');
    });
  });

  describe('POST /products/:id/upload', () => {
    it('should upload an image for a product', async () => {
      Product.findById.mockResolvedValue(mockProduct);
      Product.prototype.save.mockResolvedValue({
        ...mockProduct,
        images: [...mockProduct.images, 'newImage.jpg']
      });

      const res = await request(app)
        .post('/products/1/upload')
        .attach('file', 'path/to/test/image.jpg'); // error missing updating image

      expect(res.statusCode).toBe(200);
      expect(res.body.images).toContain('newImage.jpg');
    });
  });
});
