<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product._id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-img
            :src="product.images[0] || 'https://via.placeholder.com/150'"
            height="200px"
          ></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>
            Ingredients: {{ product.ingredients.join(', ') }}
          </v-card-subtitle>
          <v-card-text>
            <div>Reviews: {{ product.reviews ? product.reviews.length : 0 }}</div>
            <div>Availability: {{ product.availability }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">Leave a Review</v-btn>
            <v-btn color="success">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
    };
  },
  watch: {
    '$route.query.type': 'fetchProducts',
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      const filter = this.$route.query.type || '';
      try {
        const response = await axios.get(`http://localhost:3000/api/products/type/${filter}`);
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
