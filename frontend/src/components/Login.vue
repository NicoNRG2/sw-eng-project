<template>
    <v-app class="background-image">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-card class="elevation-10">
              <v-card-title>
                <span class="headline">Login</span>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="brown darken-4" dark>Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'Login',
  };
  </script>
  
  <style scoped>
  .v-card {
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
  