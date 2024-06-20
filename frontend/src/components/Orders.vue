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
            <template v-slot:item.pickupTime="{ item }">
              <span>{{ formatDateTime(item.pickupTime) }}</span>
            </template>
            <template v-slot:item.status="{ item }">
              <v-select
                v-if="isAdmin"
                v-model="item.status"
                :items="statuses"
                @update:model-value="updateStatus(item)"
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
            <template v-slot:item.totalPrice="{ item }">
              <span>{{ item.totalPrice }} €</span>
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
 import axiosOnRender from '@/../axiosConfig';
  import { jwtDecode } from 'jwt-decode';
  
  export default {
    name: 'Orders',
    data() {
      return {
        adminHeaders: [
          { title: 'Pickup Time', value: 'pickupTime' },
          { title: 'Status', value: 'status' },
          { title: 'User', value: 'userId.username' },
          { title: 'Items', value: 'items' },
          { title: 'Total Price', value: 'totalPrice' },
        ],
        userHeaders: [
          { title: 'Pickup Time', value: 'pickupTime' },
          { title: 'Status', value: 'status' },
          { title: 'Items', value: 'items' },
          { title: 'Total Price', value: 'totalPrice' },
          { title: 'Actions', value: 'actions', sortable: false },
        ],
        reservations: [],
        statuses: [
            { title: 'Accepted', value: 'accepted' },
            { title: 'Rejected', value: 'rejected' },
            { title: 'Pending', value: 'pending' },
            { title: 'Completed', value: 'completed' },
        ],
        token: '',
        isAdmin: false,
        userId: null,
        username: null,
      };
    },
    created() {
      this.token = localStorage.getItem('token');
      if (this.token) {
        const decodedToken = jwtDecode(this.token);
        this.userId = decodedToken.userId;
        this.username = decodedToken.username;
        this.checkAdmin();
      }
      this.fetchOrders();
    },
    methods: {
      fetchOrders() {
        const url = this.isAdmin
          ? '/api/reservations'
          : `/api/reservations/user/${this.userId}`;
          axiosOnRender.get(url, { headers: { Authorization: `Bearer ${this.token}` } })
          .then((response) => {
            this.reservations = response.data;
          })
          .catch((error) => {
            console.error('Error fetching reservations:', error);
          });
      },
      async deleteReservation(id) {
        try {
          await axiosOnRender.delete(`/api/reservations/${id}`, { headers: { Authorization: `Bearer ${this.token}` } });
          this.fetchOrders();
        } catch (error) {
          console.error('Error deleting reservation:', error);
        }
      },
      async updateStatus(reservation) {
        try {
          await axiosOnRender.put(`/api/reservations/${reservation._id}`, {
            status: reservation.status,
          }, { headers: { Authorization: `Bearer ${this.token}` } });
          console.log('Reservation status updated');
        } catch (error) {
          console.error('Error updating reservation status:', error);
        }
      },
      checkAdmin() {
        this.isAdmin = this.username === 'admin';
      },
      formatDateTime(dateTime) {
        const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        };
        return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateTime));
      },
    },
  };
  </script>
  
  <style scoped>
  .headline {
    font-weight: bold;
  }
  .v-data-table-header th {
    background-color: #f5f5f5;
    color: #000;
  }
  </style>