<template>
  <v-app>
    <v-app-bar app color="brown lighten-1" dark>
      <!--Bakery 4 you title with click handler-->
      <v-toolbar-title @click="go2Home" class="cursor-pointer" style="display: flex; align-items: center;">
        <v-icon left size="24px" class="mr-2">mdi-home</v-icon>
        <span>Bakery4You</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!--product list buttons-->
      <v-btn text v-for="filter in filters" :key="filter" @click="filterProducts(filter)">
        {{ filter }}
      </v-btn>

      <v-btn v-if="username" text @click="shoppingCart()"><v-icon left>mdi-cart</v-icon></v-btn>

      <!--profile icon-->
      <v-menu v-if="username" bottom>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">
            <v-icon left class="mr-2">mdi-account</v-icon>
            {{ username }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="goToProfile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn v-else text @click="login">
        <v-icon left class="mr-2">mdi-login</v-icon>
        Login
      </v-btn>
    </v-app-bar>

    <v-main>
      <div class="background">
        <v-container>
          <router-view></router-view>
        </v-container>
      </div>
    </v-main>

    <v-footer app color="brown lighten-1" dark>
      <v-col class="text-center">
        Come pick up your order at Waltham Holt
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { jwtDecode } from "jwt-decode";

export default {
  name: 'Layout',
  data() {
    return {
      filters: ['Gluten Free', 'Vegan', 'Bread', 'Desserts'],
      username: '',
    };
  },
  created() {
    // Decode the JWT token and get the username
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      this.username = decodedToken.username;
    }
  },
  methods: {
    // product list handler
    filterProducts(filter) {
      this.$router.push({
        name: 'ProductList',
        query: { type: filter }
      });
    },

    shoppingCart() {
      this.$router.push('/shoppingcart');
    },

    // go to home handler
    go2Home() {
      this.$router.push('/');
    },

    goToProfile() {
      this.$router.push('/profile');
    },

    login() {
      this.$router.push('/login');
    },

    logout() {
      localStorage.removeItem('token');
      this.username = '';
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.background {
  min-height: calc(100vh - var(--v-layout-top) - var(--v-layout-bottom));
  background-image: url('@/assets/castagnole.png');
  background-size: cover;
  background-position: center;
  opacity: 0.9;
  position: relative;
}

.background::before {
  content: '';
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
