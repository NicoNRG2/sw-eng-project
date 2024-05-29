<template>
  <v-app class="background-image">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6">
          <v-card class="elevation-10">
            <v-card-title>
              <span class="headline">Register</span>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Name"
                  name="name"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="name"
                ></v-text-field>
                <v-text-field
                  label="Surname"
                  name="surname"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="surname"
                ></v-text-field>
                <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="email"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  label="Username"
                  name="username"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="brown darken-4" dark @click="register">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top>
      {{ snackbarText }}
      <v-btn v-if="showLoginLink" text color="white" @click="navigateToLogin">Login</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      showLoginLink: false,
    };
  },
  methods: {
    async register() {
      const user = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        username: this.username,
        password: this.password
      };
      try {
        const response = await axios.post('https://localhost:3000/api/users', user);
        console.log('User registered successfully:', response.data);
        this.snackbarText = 'Registration successful! Please proceed to login.';
        this.snackbarColor = 'green';
        this.showLoginLink = true;
        this.snackbar = true;
      } catch (error) {
        console.error('There was an error registering the user:', error);
        this.snackbarText = 'Registration failed. Please try again.';
        this.snackbarColor = 'red';
        this.showLoginLink = false;
        this.snackbar = true;
      }
    },
    navigateToLogin() {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: 100px auto;
}

.background-image {
  background-image: url('@/assets/castagnole.png');
  background-size: cover;
  background-position: center;
  opacity: 0.9;
  position: relative;
}

.background-image::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
}
</style>
