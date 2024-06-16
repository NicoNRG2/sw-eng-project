<template>
<v-container>
    <v-card>
    <v-card-title>
        <span class="headline">Orders</span>
    </v-card-title>
    <v-card-text>
        <v-data-table
        :headers="isAdmin ? adminHeaders : userHeaders"
        :items="reservations"
        :items-per-page="5"
        class="elevation-1"
        >
        <template v-slot:item.status="{ item }">
            <v-select
            v-if="isAdmin"
            v-model="item.status"
            :items="statuses"
            @change="updateStatus(item)"
            ></v-select>
            <span v-else>{{ item.status }}</span>
        </template>
        <template v-slot:item.items="{ item }">
            <span>
              <v-chip
                v-for="(product, index) in item.items"
                :key="index"
                class="ma-1"
                outlined
              >
                {{ product.productId.name }}
              </v-chip>
            </span>
          </template>
        <template v-slot:item.actions="{ item }">
            <v-btn
            v-if="!isAdmin && item.status === 'pending'"
            color="red"
            @click="deleteReservation(item._id)"
            >
            Cancel
            </v-btn>
        </template>
        </v-data-table>
    </v-card-text>
    </v-card>
</v-container>
</template>
  
  <script>
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';
  
  export default {
    name: 'Orders',
    data() {
      return {
        adminHeaders: [
            { title: 'Pickup Time', value: 'pickupTime' },
            { title: 'Status', value: 'status' },
            { title: 'User', value: 'userId.name' },
            { title: 'Items', value: 'items' },
            { title: 'Total Price', value: 'totalPrice' },
            { title: 'Actions', value: 'actions', sortable: false },
        ],
        userHeaders: [
            { title: 'Pickup Time', value: 'pickupTime' },
            { title: 'Status', value: 'status' },
            { title: 'Items', value: 'items' },
            { title: 'Total Price', value: 'totalPrice' },
            { title: 'Actions', value: 'actions', sortable: false },
        ],
        reservations: [],
        statuses: ['accepted', 'rejected', 'pending', 'completed'],
        isAdmin: false
      };
    },
    created() {
      const token = localStorage.getItem('token');
        if (token) {
        const decodedToken = jwtDecode(token);
        this.userId = decodedToken.userId;
        this.username = decodedToken.username;
        this.checkAdmin();
        }
        this.fetchOrders();
    },
    methods: {
      fetchOrders() {
        try {
          axios.get(this.isAdmin ? 'https://localhost:3000/api/reservations' : `https://localhost:3000/api/reservations/user/${this.userId}`).then((response) => {
            this.reservations = response.data;
          });
        } catch (error) {
          console.error('Error fetching reservations:', error);
        }
      },
      async deleteReservation(id) {
        try {
            await axios.delete(`/api/reservations/${id}`);
            this.fetchReservations();
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
      },
      async updateStatus(reservation) {
        try {
            await axios.put(`/api/reservations/${reservation._id}`, {
            status: reservation.status,
            });
        } catch (error) {
            console.error('Error updating reservation status:', error);
        }
      },
      checkAdmin() {
        if (this.username === 'admin') {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Stili opzionali */
  </style>
  