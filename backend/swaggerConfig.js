const swaggerJSDoc = require('swagger-jsdoc');
const { schema } = require('./models/product');
const Product = require('./models/product');
const Review = require('./models/review');
const ShoppingCart = require('./models/shoppingCart');
const Reservation = require('./models/reservation');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bakery4You API',
      version: '1.0.0',
      description: 'A simple API for a bakery website',
    },
    servers: [
      {
        url: 'https://localhost:3000/api',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The user ID',
            },
            name: {
              type: 'string',
              description: 'The user name',
            },
            surname: {
              type: 'string',
              description: 'The user surname',
            },
            email: {
              type: 'string',
              description: 'The user email',
            },
            username: {
              type: 'string',
              description: 'The user username',
            },
            password: {
              type: 'string',
              description: 'The user password',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The product ID',
            },
            name: {
              type: 'string',
              description: 'The product name',
            },
            category: {
              type: 'string',
              description: 'The product category',
            },
            ingredients: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'The product ingredients',
            },
            price: {
              type: 'number',
              description: 'The product price',
            },
            availability: {
              type: 'number',
              description: 'The product availability',
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'The product images',
            },
            vegan: {
              type: 'boolean',
              description: 'The product vegan status',
            },
            gluten_free: {
              type: 'boolean',
              description: 'The product gluten free status',
            },
          },
        },
        Review: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The review ID',
            },
            rating: {
              type: 'number',
              description: 'The review rating min 1, max 5',
            },
            comment: {
              type: 'string',
              description: 'The review comment',
            },
            product: {
              type: 'string',
              description: 'The product ID',
            },
            user: {
              type: 'string',
              description: 'The user ID',
            },
          },
        },
        ShoppingCart: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The shopping cart ID',
            },
            userId: {
              type: 'string',
              description: 'The user ID',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'The product ID',
                  },
                  quantity: {
                    type: 'number',
                    description: 'The product quantity',
                  },
                },
              },
              description: 'The shopping cart items',
            },
            totalPrice: {
              type: 'number',
              description: 'The shopping cart total price',
            },
          },
        },
        Reservation: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The reservation ID',
            },
            pickupTime: {
              type: 'string',
              description: 'The reservation pickup time',
            },
            status: {
              type: 'string',
              description: 'The reservation status',
            },
            userId: {
              type: 'string',
              description: 'The user ID',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'The product ID',
                  },
                  quantity: {
                    type: 'number',
                    description: 'The product quantity',
                  },
                },
              },
              description: 'The reservation items',
            },
            totalPrice: {
              type: 'number',
              description: 'The reservation total price',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'https',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Route files to be documented
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
