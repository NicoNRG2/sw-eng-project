<template>
  <v-app class="background-image">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="4">
          <v-card class="elevation-10 login-card">
            <v-card-title>
              <span class="headline">Login</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" @submit.prevent="login">
                <v-text-field
                  label="Username"
                  name="username"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="username"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                  required
                ></v-text-field>

                  <v-card-text>
                    Are you not registered yet?
                  </v-card-text>
                  <v-btn color="brown darken-4" dark @click="go2register">Sign up</v-btn>
                
              </v-form>
 


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="brown darken-4" dark @click="login">Login</v-btn>
            </v-card-actions>

            <v-snackbar v-model="snackbar" :color="snackbarColor" top>
              {{ snackbarText }}
            </v-snackbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
    };
  },
  methods: {
    go2register(){
      this.$router.push('/register');
    },

    async login() {
      try {
        const response = await axios.post('https://localhost:3000/api/users/login', {
          username: this.username,
          password: this.password,
        });
        // Store the JWT token in local storage
        localStorage.setItem('token', response.data.token);
        this.snackbarText = 'Login successful!';
        this.snackbarColor = 'green';
        this.snackbar = true;
        // Redirect to homepage with reload
        window.location.href = '/';
      } catch (error) {
        console.error('There was an error logging in:', error);
        this.snackbarText = 'Login failed. Please try again.';
        this.snackbarColor = 'red';
        this.snackbar = true;
      }
    },
  },
};
</script>

<style scoped>
.login-card {
  max-width: 400px;
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
