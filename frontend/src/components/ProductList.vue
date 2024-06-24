<template>
  <div v-if="isAdmin" class="text-center">
    <v-btn color="green" @click="showAddProductDialog = true">Add New Product</v-btn>

    <v-dialog v-model="showAddProductDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Product</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="Name" v-model="newProduct.name" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Category" v-model="newProduct.category" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Ingredients" v-model="newProduct.ingredients" hint="Comma separated" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Price" v-model="newProduct.price" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Availability" v-model="newProduct.availability" type="number"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-switch label="Vegan" v-model="newProduct.vegan"></v-switch>
              </v-col>
              <v-col cols="12">
                <v-switch label="Gluten Free" v-model="newProduct.gluten_free"></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showAddProductDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="addProduct">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <v-row>
    <v-col v-for="product in products" :key="product._id">
      <v-card class="mx-auto my-12 rounded-lg productlist-card" max-width="350">
        <div v-if="isAdmin" class="admin-controls"> 
          <v-btn 
            class="red--text text--lighten-1 delete-button" 
            @click="deleteProduct(product._id)" 
            icon 
          > 
            <v-icon color="red">mdi-close</v-icon> 
          </v-btn> 
        </div>
        
        <div class="image-container">
          <v-img
            height="200"
            width="200"
            :src="getImage(product)"
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
          <div class="text-center">Price: € {{ product.price.toFixed(2) }}</div>
        </v-card-text>

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

        <v-card-actions>
          <v-btn
            class="rounded-xl"
            color="brown lighten-1"
            text="Show reviews"
            block
            border
            @click="fetchReviews(product._id); resetReviews()"
          ></v-btn>
        </v-card-actions>

          <div v-if="!isAdmin && username">

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
                  <v-list-item v-for="n in product.availability" :key="n" link @click="addToCart(product._id, n)">
                    <v-list-item-title v-text="n"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>

            <v-card-actions>
              <v-btn
                class="rounded-xl"
                color="brown lighten-1"
                text="Leave a review"
                block
                border
                @click="openReviewsDialog(product._id)"
              ></v-btn>
            </v-card-actions>
          </div>
      </v-card>
    </v-col>

    <v-dialog v-model="showReviewsDialog" max-width="600" @click:outside="resetReviews">

      <v-card title="Reviews">
        <v-card-text>
          <v-list>
            <v-list-item v-for="review in reviews" :key="review._id">
              <v-list-item-title>{{ review.comment }}</v-list-item-title>
              <v-list-item-subtitle>
                <v-rating
                  :model-value="review.rating"
                  color="amber"
                  density="compact"
                  size="small"
                  half-increments
                  readonly
                ></v-rating>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="showReviewsDialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="600">

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
            @click="saveReview()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
  <v-snackbar v-model="snackbar.show" :timeout="3000" bottom>
    {{ snackbar.text }}
  </v-snackbar>
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
        productId: '',
        rating: null,
        text: ''
      },
      reviews: [],
      showReviewsDialog: false,
      token: '',
      username: '',
      isAdmin: false,
      showAddProductDialog: false,
      newProduct: {
        name: '',
        category: '',
        ingredients: '',
        price: 0,
        availability: 0,
        vegan: false,
        gluten_free: false,
      },
      snackbar: {
        show: false,
        text: ''
      }
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
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedToken = jwtDecode(this.token);
      this.userId = decodedToken.userId;
      this.username = decodedToken.username;
      this.checkAdmin();
    }
  },
  methods: {
    resetReviews() {
      this.reviews = [];
    },
    async addToCart(productId, quantity) {
      try {
        const response = await axios.post('https://localhost:3000/api/shopping-cart/add', {
          userId: this.userId,
          productId: productId,
          quantity: quantity
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        if (response.status === 201) {
          this.snackbar.text = 'Product added to cart';
          this.snackbar.show = true;
        } else {
          console.error('Failed to add product to cart:', response.data.message);
          this.snackbar.text = 'Error adding product to cart';
          this.snackbar.show = true;
        }
      } catch (error) {
        console.error('Error:', error);
        this.snackbar.text = 'Connection error';
        this.snackbar.show = true;
      }
    },
    async addProduct() {
      try {
        const response = await axios.post('https://localhost:3000/api/products', this.newProduct, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        });
        this.showAddProductDialog = false;
        this.resetForm();
        this.fetchProducts();
      } catch (error) {
        console.error('There was an error adding the product:', error);
      }
    },
    resetForm() {
      this.newProduct = {
        name: '',
        category: '',
        ingredients: '',
        price: 0,
        availability: 0,
        vegan: false,
        gluten_free: false,
      };
    },
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
              'Authorization': `Bearer ${this.token}`,
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
      return product.images
        ? `https://localhost:3000/uploads/${product.images}`
        : 'https://cdn.iconscout.com/icon/free/png-256/free-vue-282497.png?f=webp';
    },
    async fetchProducts() {
      let filter = this.$route.query.type || '';
      if(filter == 'Gluten Free'){
        filter = 'gluten_free';
      }
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
      const _id = product._id;
      try {
        const response = await axios.get(`https://localhost:3000/api/reviews/average/${_id}`);
        product.ratingData = response.data;
      } catch (error) {
        console.error(`Error fetching rating for product ${_id}:`, error);
        product.ratingData = null;
      }
    },
    async saveReview() {
      if (this.isFormValid) {
        try {
          const response = await axios.post('https://localhost:3000/api/reviews', {
            rating: this.review.rating,
            comment: this.review.text,
            product: this.review.productId,
            user: this.userId,
          }, {
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          });

          console.log('Review saved succesfully: ', response.data);
          this.fetchProducts();
          this.review = {
            productId: '',
            rating: null,
            text: ''
          };
          this.dialog = false;
        } catch (error) {
          console.error('Error saving review: ', error);
        }
      }
    },
    async fetchReviews(productId) {
      this.resetReviews();
      try {
        const response = await axios.get(`https://localhost:3000/api/reviews/product/${productId}`);
        this.reviews = response.data;
        this.showReviewsDialog = true;
        console.log(this.reviews);
      } catch (error) {
        console.error(`Error fetching reviews for product ${productId}:`, error);
      }
    },
    openReviewsDialog(productId) {
      this.dialog = true;
      this.review.productId = productId;
    },
    async updateName(productId, newName) {
      console.log('updateName called with:', productId, newName); // Debug
      try {
        const response = await axios.put(`https://localhost:3000/api/products/${productId}`, {
          name: newName
        }, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
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
    },
    async updatePrice(productId, newPrice) {
      console.log('updatePrice called with:', productId, newPrice); // Debug
      try {
        const response = await axios.put(`https://localhost:3000/api/products/${productId}`, {
          price: newPrice
        }, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
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
    async updateAvailability(productId, newQuantity) {
      try {
        const response = await axios.put(`https://localhost:3000/api/products/${productId}`, {
          availability: newQuantity
        }, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
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
        const response = await axios.put(`https://localhost:3000/api/products/${productId}`, {
          ingredients: ingredientsArray
        }, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
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
    async deleteProduct(productId) { 
      try { 
        const response = await axios.delete(`https://localhost:3000/api/products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        console.log('Product deleted successfully: ', response.data); 
        this.fetchProducts(); // Refresh the product list 
      } catch (error) { 
        console.error('Error deleting product: ', error); 
      } 
    }

  },
};
</script>

<style scoped>
.productlist-card {
  margin-bottom: 20px;
  max-width: 350px;
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
