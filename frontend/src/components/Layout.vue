<template>
  <v-app>
    <v-container>
      <v-app-bar app color="brown lighten-1" dark>
        <!--Bakery 4 you title with click handler-->
        <v-toolbar-title @click="go2Home" class="cursor-pointer">Bakery4You</v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- Display username if logged in -->
        <v-btn v-if="username" text>Welcome, {{ username }}</v-btn>

        <v-btn text v-for="link in links" :key="link.text" @click="go2Home(link.route)">
          {{ link.text }}
        </v-btn>

        <!--product list buttons-->
        <v-btn text v-for="filter in filters" :key="filter" @click="filterProducts(filter)">
          {{ filter }}
        </v-btn>
      </v-app-bar>

      <router-view></router-view>
      <v-footer app color="brown lighten-1" dark>
        <v-col class="text-center">
          Come pick up your order at [Street Name]
        </v-col>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script>
import { jwtDecode } from "jwt-decode";

export default {
  name: 'AppLayout',
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

    // go to home handler
    go2Home() {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
