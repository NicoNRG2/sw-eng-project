const express = require('express');
const mongoose = require('mongoose');
const dbConnectionString = require('./dbConfig');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database
mongoose.connect(dbConnectionString)
  .then(() => {
    console.log('Successfully connected to the MongoDB database');
  })
  .catch((err) => {
    console.error('Error connecting to the MongoDB database:', err);
    process.exit(1);
  });

// Use routes for products
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
