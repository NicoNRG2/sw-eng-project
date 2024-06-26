<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-list color="grey-darken-3">
        <v-list-item
          v-for="item in shoppingCart.items"
          :key="item"
          class="d-flex justify-space-between"
        >
          <v-card class="mx-auto" >
            <v-row>
              <v-img
                :width="200"
                :height="200"
                aspect-ratio="1"
                :src="getImage(item.productId)"
                cover
              ></v-img>
              <v-col>
                <v-card-title>
                  <p class="text-h4 font-weight-black">{{ item.productId.name }}</p>
                </v-card-title>
                <v-card-text>
                  € {{item.productId.price}}
                </v-card-text>

                <!--
                <v-dialog transition="dialog-bottom-transition" v-model="dialog" max-width="auto">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn 
                      variant="plain" 
                      v-bind="activatorProps"
                      text=" Read the details "
                    ></v-btn>
                  </template>

                  <v-card>
                    <v-card-text>
                      <v-col>

                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-dialog>-->

                <v-text-field
                  v-model="item.quantity"
                  label="Quantity"
                  type="number"
                  @change="updateQuantity(item.productId._id, item.quantity)"
                  outlined
                ></v-text-field>
                
                <v-btn variant="text" @click="removeItem(item)">Remove</v-btn>
              </v-col>
            </v-row>

            <v-divider :thickness="3"></v-divider>
            <!--<v-card-text>
              <div>{{ item.name }}</div>
              <p class="text-h4 font-weight-black">{{ item.name }}</p>
              <p>{{ item.description }}</p>
              <div class="text-medium-emphasis">
                Prezzo unitario: {{ item.price }} €<br />
                Quantità: {{ item.quantity }}<br />
                Totale: {{ item.price * item.quantity }} €
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn icon @click="decreaseQuantity(item)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-text-field
                v-model="item.quantity"
                type="number"
                class="mx-2"
                style="max-width: 60px"
              ></v-text-field>
              <v-btn icon @click="increaseQuantity(item)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>-->
          </v-card>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="12" md="4">
      <div class="sticky-sidebar">
        <v-card class="mx-auto">
          <v-card-text>
            <div class="text-h6 font-weight-medium">Order Summary</div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between">
              <span>Total:</span>
              <span>{{ formattedTotalPrice }} €</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="brown lighten-1" block @click="proceedToCheckout">Proceed to checkout</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Set Pickup Time</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="pickupTime"
                label="Pickup Time"
                type="datetime-local"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="createReservation">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-col>
  </v-row>
  </template>
  
  <script>
  import axios from 'axios';  
  import { jwtDecode } from 'jwt-decode';

    export default {
      name: 'ShoppingCart',
      data() {
        return {
          shoppingCart: '',
          token: '',
          dialog: false,
          pickupTime: ''
        }
      },
      computed: {
        formattedTotalPrice() {
          return this.shoppingCart.totalPrice ? this.shoppingCart.totalPrice.toFixed(2) : '0.00';
        }
      },
      created() {
        this.token = localStorage.getItem('token');
        if (this.token) {
          const decodedToken = jwtDecode(this.token);
          this.userId = decodedToken.userId;
          if (this.userId) {
            this.getShoppingCart(this.userId);
          }
        }
      },
      methods: {
        updateQuantity(productId, quantity) {
          if (!this.shoppingCart) return;

          const updatedItems = this.shoppingCart.items.map(item => {
            if (item.productId._id === productId) {
              item.quantity = quantity;
            }
            return item;
          });
          axios.put(`https://localhost:3000/api/shopping-cart/${this.shoppingCart._id}`, { items: updatedItems }, { headers: { Authorization: `Bearer ${this.token}` } })
            .then(response => {
              if (response.data.message === 'ok') {
                this.shoppingCart.items = updatedItems;
                console.log('Cart updated successfully');
              }
            })
            .catch(error => {
              console.error('Error updating cart:', error);
            });
        },
        proceedToCheckout() {
          this.dialog = true;
        },
        async createReservation() {
          if (this.$refs.form.validate()) {
            try {
              const response = await axios.post(`https://localhost:3000/api/reservations`, {
                pickupTime: this.pickupTime,
                userId: this.userId,
                items: this.shoppingCart.items,
              }, { headers: { Authorization: `Bearer ${this.token}` } });
              this.dialog = false;
              // empty the shopping cart
              emptyCart();
              this.$router.push('/orders');
            } catch (error) {
              console.error('Error creating reservation:', error);
            }
          }
        },
        async emptyCart() {
          try {
            const removeItemPromises = this.shoppingCart.items.map(item =>
              axios.post(`https://localhost:3000/api/shopping-cart/remove`, 
                { userId: this.userId, productId: item.productId._id }, 
                { headers: { Authorization: `Bearer ${this.token}` } })
            );
            await Promise.all(removeItemPromises);
            this.shoppingCart.items = [];
            console.log("Cart emptied successfully");
          } catch (error) {
            console.error('Error emptying cart:', error);
          }
        },
        async getShoppingCart(userId){
          try {
              const response = await axios.get(`https://localhost:3000/api/shopping-cart/user/${userId}`);
              const shoppingCart = response.data;
              
              this.shoppingCart = shoppingCart;
            } catch (error) {
              console.error('Error fetching cart or product details:', error);
          }
        },
        async removeItem(item) {
          try {
            await axios.post(`https://localhost:3000/api/shopping-cart/remove`, { userId: this.userId, productId: item.productId._id }, { headers: { Authorization: `Bearer ${this.token}` } });
            this.getShoppingCart(this.userId);
          } catch (error) {
            console.error('Error removing item from cart:', error);
          }
        },
        getImage(product) {
          return product.images
            ? `https://localhost:3000/uploads/${product.images}`
            : 'https://cdn.iconscout.com/icon/free/png-256/free-vue-282497.png?f=webp';
    },
      },
    }
  </script>
  
  <style scoped>
    .sticky-sidebar {
      position: -webkit-sticky;
      position: sticky;
      top: 8%;
    }
    .mx-2 {
      margin-left: 8px;
      margin-right: 8px;
    }
    .my-2 {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  </style>