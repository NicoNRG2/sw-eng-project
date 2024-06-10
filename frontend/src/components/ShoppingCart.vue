<template>
    <v-container>
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
                    aspect-ratio="1/1"
                    src="https://cdn.iconscout.com/icon/free/png-256/free-vue-282497.png?f=webp"
                    cover
                  ></v-img>
                  <v-col>
                    <v-card-title>
                      <p class="text-h4 font-weight-black">{{ item.productId.name }}</p>
                    </v-card-title>
                    <v-card-text>
                      € {{item.productId.price}}
                    </v-card-text>

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
                    </v-dialog>

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
                <div class="text-h6 font-weight-medium">Riepilogo Ordine</div>
                <v-divider class="my-2"></v-divider>
                <div class="d-flex justify-space-between">
                  <span>Totale:</span>
                  <span>{{ shoppingCart.totalPrice }} €</span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="brown lighten-1" block @click="proceedToCheckout"
                  >Procedi al checkout</v-btn
                >
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';  
  import { jwtDecode } from 'jwt-decode';

    export default {
      name: 'ShoppingCart',
      data() {
        return {
          shoppingCart: '',
          dialog: false
        }
      },
      computed: {
        totalPrice() {
          return this.cartItems.reduce((total, item) => {
            return total + item.price * item.quantity
          }, 0)
        },
      },
      created() {
        const token = localStorage.getItem('token');
        if (token) {
          console.log('Yes token');
          const decodedToken = jwtDecode(token);
          this.userId = decodedToken.userId;
          console.log(this.userId);
          if (this.userId) {
            console.log('Sta andando');
            this.getShoppingCart(this.userId);
          }
        } else {
          console.log('No token')
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

          console.log('Updated items:', updatedItems);

          axios.put(`https://localhost:3000/api/shopping-cart/${this.shoppingCart._id}`, { items: updatedItems })
            .then(response => {
              this.shoppingCart = response.data;
            })
            .catch(error => {
              console.error('Error updating cart:', error);
            });
        },
        proceedToCheckout() {
          // Logica per procedere al checkout
          console.log('Procedi al checkout')
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
          //console.log('Removing item:', item.productId._id, 'from user:', this.userId);
          try {
            await axios.post(`https://localhost:3000/api/shopping-cart/remove`, { userId: this.userId, productId: item.productId._id });
            this.getShoppingCart(this.userId);
          } catch (error) {
            console.error('Error removing item from cart:', error);
          }
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