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
                    :width="245"
                    aspect-ratio="1/1"
                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  ></v-img>
                  <v-card-title>
                    <p class="text-h4 font-weight-black">{{ item.productId.name }}</p>
                  </v-card-title>
                </v-row>
                
                <v-card-text>
                  <p>{{item.productId.price}}</p>
                </v-card-text>

                <v-divider
                  :thickness="3"
                ></v-divider>
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
                <v-btn color="primary" block @click="proceedToCheckout"
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
          cartItems: [
            {
              name: 'Prodotto 1',
              description: 'Descrizione del prodotto 1',
              price: 10,
              quantity: 1,
            },
            {
              name: 'Prodotto 2',
              description: 'Descrizione del prodotto 2',
              price: 20,
              quantity: 2,
            },
            {
              name: 'Prodotto 1',
              description: 'Descrizione del prodotto 1',
              price: 10,
              quantity: 1,
            },
            {
              name: 'Prodotto 1',
              description: 'Descrizione del prodotto 1',
              price: 10,
              quantity: 1,
            },
            {
              name: 'Prodotto 1',
              description: 'Descrizione del prodotto 1',
              price: 10,
              quantity: 1,
            },
          ],
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
          console.log(decodedToken.email);
          if (this.userId) {
            console.log('Sta andando');
            this.getShoppingCart(this.userId);
          }
        } else {
          console.log('No token')
        }
      },
      methods: {
        increaseQuantity(item) {
          item.quantity++
        },
        decreaseQuantity(item) {
          if (item.quantity > 1) {
            item.quantity--
          }
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
        }
      },
    }
  </script>
  
  <style scoped>
    .sticky-sidebar {
      position: -webkit-sticky;
      position: sticky;
      top: 20px;
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
  