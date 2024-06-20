<template>
  <v-row>
    <v-col>
      <v-card style="max-width: 50vw; margin: auto;">
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="updateUser">
            <v-text-field
              label="Name"
              name="name"
              type="text"
              v-model="userData.name"
              required
            ></v-text-field>
            <v-text-field
              label="Surname"
              name="surname"
              type="text"
              v-model="userData.surname"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              name="email"
              type="text"
              v-model="userData.email"
              required
            ></v-text-field>
            <v-text-field
              label="Username"
              name="username"
              type="text"
              v-model="userData.username"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              name="password"
              type="password"
              v-model="userData.password"
              required
            ></v-text-field>
            <v-btn color="brown darken-4" dark @click="updateUser">Update</v-btn>
          </v-form>
        </v-card-text>
        <v-snackbar v-model="snackbar" :color="snackbarColor" top>
          {{ snackbarText }}
        </v-snackbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'Profile',
  data() {
    return {
      userData: {},
      token: '',
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
    };
  },
  created() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedToken = jwtDecode(this.token);
      this.userId = decodedToken.userId;
    }
    this.fetchUser(this.userId);
  },
  methods: {
    async fetchUser(userId){
      try {
          const response = await axios.get(`https://localhost:3000/api/users/${userId}`);
          const userData = response.data;
          
          this.userData = userData;

        } catch (error) {
          console.error('Error fetching cart or product details:', error);
      }
    },
    async updateUser() {
      try {
        await axios.put(`https://localhost:3000/api/users/${this.userData._id}`, {
          name: this.userData.name,
          surname: this.userData.surname,
          email: this.userData.email,
          username: this.userData.username,
          password: this.userData.password,
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        
        this.snackbarText = 'User updated successfully!';
        this.snackbarColor = 'success';
        this.snackbar = true;
        
        this.fetchUser(this.userData._id);
      } catch (error) {
        this.snackbarText = 'Error updating user.';
        this.snackbarColor = 'error';
        this.snackbar = true;
        console.error('Error updating user:', error);
      }
    },
  },
};
</script>