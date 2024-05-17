<template>
  <div>
    <h1>Products</h1>
    <v-container>
      <v-row>
        <v-col v-for="product in products" :key="product._id" cols="12" md="4">
          <v-card>
            <v-img :src="product.images[0]" height="200px"></v-img>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle>{{ product.price }} €</v-card-subtitle>
            <v-card-text>
              <p><strong>Category:</strong> {{ product.category }}</p>
              <p><strong>Ingredients:</strong> {{ product.ingredients.join(', ') }}</p>
              <p><strong>Availability:</strong> {{ product.availability }}</p>
              <p><strong>Vegan:</strong> {{ product.vegan ? 'Yes' : 'No' }}</p>
              <p><strong>Gluten Free:</strong> {{ product.gluten_free ? 'Yes' : 'No' }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
};
</script>

<style scoped>
</style>
