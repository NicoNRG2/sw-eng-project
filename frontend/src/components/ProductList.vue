<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-12 rounded-lg v-card"
    max-width="350"
    max-height="600"
    :dark="isDarkThemed"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
    <div class="image-container">
      <v-img height="200" width="200" :src="getImage(product)" cover></v-img>
    </div>

    <v-card-item>
      <v-card-title class="text-center">{{product.name}}</v-card-title>

      <v-card-subtitle class="text-center">
        Availability: {{ product.availability}}

        <v-icon
          v-if="product.availability === 0"
          color="error"
          icon="mdi-alert-circle"
          size="x-small"
          :style="{ position: 'relative', top: '-1px' }"
        ></v-icon>
        <v-icon
          v-else
          color="success"
          icon="mdi-check-circle"
          size="x-small"
          :style="{ position: 'relative', top: '-2px' }"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <!-- TODO: dinamically adjust ratings-->
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-col class="d-flex justify-center align-center">
          <v-rating
            :model-value="4.5"
            color="amber"
            density="compact"
            size="large"
            half-increments
            readonly
          ></v-rating>
          <div class="text-grey ms-4">4.5 (3mil)</div>
        </v-col>
      </v-row>

      <div class="my-4 text-subtitle-1"></div>

      <div align="center" style="max-height: 20px; overflow-y: auto">
        {{ product.ingredients.join(', ') }}
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-col cols="12">
      <v-menu transition="scroll-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            class="rounded-xl"
            color="deep-purple-lighten-2"
            text="Add to cart"
            block
            border
            v-bind="props"
          ></v-btn>
        </template>
        <v-list class="rounded-xl" :style="{height: '200px', overflow: 'auto'}">
          <v-list-item v-for="n in product.availability" :key="n" link>
            <v-list-item-title v-text="n"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>

    <v-card-actions>
      <v-row>
        <v-col>
          <v-btn
            class="rounded-xl"
            color="deep-purple-lighten-2"
            text="Leave a review"
            block
            border
            @click="reserve"
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
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
    reserve() {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    getImage(prd) {
      return prd.images
        ? prd.images
        : 'https://cdn.iconscout.com/icon/free/png-256/free-vue-282497.png?f=webp'
    },
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
  .text-center {
    text-align: center;
  }
  .image-container {
    display: grid;
    justify-content: center;
    align-items: center;
  }
</style>
