<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product._id">
        <v-card class="mx-auto my-12 rounded-lg productlist-card" max-width="350">
          <div class="image-container">
            <v-img
              height="200"
              width="200"
              :src="product.tempImageUrl || getImage(product)"
              cover
            ></v-img>
          </div>

          <div v-if="isAdmin">
            <v-divider class="mx-4 mb-1"></v-divider>
            <v-card-text>
              <v-file-input
                label="Upload Image"
                @change="uploadImage($event, product)"
                accept="image/*"
              ></v-file-input>

              <v-text-field
                label="Modify Name"
                v-model="product.name"
                
                @change="updateName(product._id, product.name)"
              ></v-text-field>
              <v-text-field
                label="Modify Price"
                v-model="product.price"
                type="number"
                @change="updatePrice(product._id, product.price)"
              ></v-text-field>

              <v-text-field
                label="Modify Availability"
                v-model="product.availability"
                type="number"
                @change="updateAvailability(product._id, product.availability)"
              ></v-text-field>
              <v-text-field
                label="Modify Ingredients"
                v-model="product.ingredients"
                
                @change="updateIngredients(product._id, product.ingredients)"
              ></v-text-field>
            </v-card-text>
          </div>

          <v-card-item>
            <v-card-title class="text-center">{{ product.name }}</v-card-title>

            <v-card-subtitle class="text-center">
              Availability: {{ product.availability }}
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

          <v-card-text>
            <v-col class="mx-0">
              <v-row class="d-flex justify-center" align="center">
                <div v-if="product.ratingData" class="d-flex align-center">
                  <v-rating
                    :model-value="product.ratingData.averageRating"
                    color="amber"
                    density="compact"
                    size="large"
                    half-increments
                    readonly
                  ></v-rating>
                  <div class="text-grey ms-4">
                    {{ product.ratingData.averageRating.toFixed(1) }} ({{ product.ratingData.totalReviews }})
                  </div>
                </div>
                <div v-else>
                  <div class="text-grey ms-4">Be the first one to leave a rating for this product!</div>
                </div>
              </v-row>

              <div class="my-4 text-subtitle-1"></div>

              <div align="center" style="max-height: 20px; overflow-y: auto">
                {{ product.ingredients.join(', ') }}
              </div>
            </v-col>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-col cols="12">
            <v-menu transition="scroll-x-transition">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="rounded-xl"
                  color="brown lighten-1"
                  text="Add to cart"
                  block
                  border
                  v-bind="props"
                ></v-btn>
              </template>
              <v-list class="rounded-xl" :style="{ height: '200px', overflow: 'auto' }">
                <v-list-item v-for="n in product.availability" :key="n" link>
                  <v-list-item-title v-text="n"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>

          <v-card-actions>
            <v-dialog v-model="dialog" max-width="600">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  class="rounded-xl"
                  color="brown lighten-1"
                  text="Leave a review"
                  block
                  border
                  v-bind="activatorProps"
                ></v-btn>
              </template>

              <v-card prepend-icon="mdi-message-draw" title="Leave a review!">
                <v-card-text>
                  <v-col>
                    <v-rating
                      v-model="review.rating"
                      color="amber"
                      density="compact"
                      size="x-large"
                      half-increments
                      hover
                    ></v-rating>
                    <v-text-field
                      v-model="review.text"
                      hint="Write your review, and be nice :D"
                      label="Review"
                      clearable
                    ></v-text-field>
                  </v-col>
                  <small class="text-caption text-medium-emphasis">all fields are required</small>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

                  <v-btn
                    :disabled="!isFormValid"
                    color="brown lighten-1"
                    text="Save"
                    variant="tonal"
                    @click="saveReview(product._id)"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'ProductList',
  data() {
    return {
      dialog: false,
      products: [],
      review: {
        rating: null,
        text: ''
      },
      username: '',
      isAdmin: false
    };
  },
  computed: {
    isFormValid() {
      return this.review.rating !== null && this.review.text.trim() !== '';
    }
  },
  watch: {
    '$route.query.type': 'fetchProducts',
  },
  created() {
    this.fetchProducts();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      this.userId = decodedToken.userId;
      this.username = decodedToken.username;
      this.checkAdmin();
    }
  },
  methods: {
    checkAdmin() {
      if (this.username === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    },
    async uploadImage(event, product) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await axios.post(`https://localhost:3000/api/products/${product._id}/upload-image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Image uploaded successfully: ', response.data);
          this.fetchProducts();
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      }
    },
    getImage(product) {
      return product.images && product.images.length > 0
        ? `https://localhost:3000/uploads/${product.images[0]}`
        : 'https://cdn.iconscout.com/icon/free/png-256/free-vue-282497.png?f=webp';
    },
    async fetchProducts() {
      const filter = this.$route.query.type || '';
      try {
        const response = await axios.get(`https://localhost:3000/api/products/type/${filter}`);
        this.products = response.data;
        for (let product of this.products) {
          await this.fetchProductRating(product);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchProductRating(product) {
      try {
        const _id = product._id;
        const response = await axios.get(`https://localhost:3000/api/reviews/average/${_id}`);
        product.ratingData = response.data;
      } catch (error) {
        console.error(`Error fetching rating for product ${_id}:`, error);
        product.ratingData = null;
      }
    },
    async saveReview(productId) {
      this.dialog = false;
      if (this.isFormValid) {
        try {
          console.log(this.review.comment);
          const response = await axios.post('https://localhost:3000/api/reviews', {
            rating: this.review.rating,
            comment: this.review.text,
            product: productId,
            user: '665083ca637b64fa4f15573c'
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log('Review saved succesfully: ', response.data);
        } catch (error) {
          console.error('Error saving review: ', error);
        }
      }
    }
  },
  async updateAvailability(productId, newQuantity) {
    try {
      const response = await axios.put(`https://localhost:3000/api/products/${productId}/quantity`, {
        availability: newQuantity
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Quantity updated successfully: ', response.data);
      const product = this.products.find(p => p._id === productId);
      if (product) {
        product.availability = newQuantity;
      }
    } catch (error) {
      console.error('Error updating quantity: ', error);
    }
  },
  async updateIngredients(productId, ingredients) {
      console.log('updateIngredients called with:', productId, ingredients); // Debug
      const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
      try {
        const response = await axios.put(`https://localhost:3000/api/products/${productId}/ingredients`, {
          ingredients: ingredientsArray
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Ingredients updated successfully: ', response.data);
        const product = this.products.find(p => p._id === productId);
        if (product) {
          product.ingredients = ingredientsArray;
        }
      } catch (error) {
        console.error('Error updating ingredients: ', error);
      }
    },
    async updatePrice(productId, newPrice) {
      console.log('updatePrice called with:', productId, newPrice); // Debug
      try {
        const response = await axios.put(`https://localhost:3000/api/products/${productId}/price`, {
          price: newPrice
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Price updated successfully: ', response.data);
        const product = this.products.find(p => p._id === productId);
        if (product) {
          product.price = newPrice;
        }
      } catch (error) {
        console.error('Error updating price: ', error);
      }
    },
    async updateName(productId, newName) {
      console.log('updateName called with:', productId, newName); // Debug
      try {
        const response = await axios.put(`https://localhost:3000/api/products/${productId}/name`, {
          name: newName
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Name updated successfully: ', response.data);
        const product = this.products.find(p => p._id === productId);
        if (product) {
          product.name = newName;
        }
      } catch (error) {
        console.error('Error updating name: ', error);
      }
  }
};
</script>

<style scoped>
.productlist-card {
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
