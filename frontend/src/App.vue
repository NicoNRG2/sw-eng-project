<template>
  <v-app>
    <v-container>
      <v-app-bar app color="brown lighten-1" dark>
        <v-toolbar-title>Bakery4You</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text v-for="link in links" :key="link.text" :to="link.route">{{ link.text }}</v-btn>
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
export default {
  name: 'App',
  data() {
    return {
      links: [
        { text: 'Gluten Free', route: '/gluten-free' },
        { text: 'Bread', route: '/bread' },
        { text: 'Wholemeal Flour', route: '/wholemeal-flour' },
        { text: 'Fresh Pasta', route: '/fresh-pasta' },
        { text: 'Sweets', route: '/sweets' },
        { text: 'Savory', route: '/savory' },
        { text: 'Shopping Cart', route: '/cart' },
      ],
    };
  },
};
</script>

<style>
@import 'vuetify/styles';
</style>
