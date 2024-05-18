<template>
  <v-container class="fill-height">
    <v-row align="center" justify="space-around">
      <v-col cols="12" md="6">
        <h1 class="text-h2 brown--text text--darken-4">Bakery4You</h1>
        <h2 class="text-h4 brown--text text--darken-3">What about us</h2>
        <v-list dense>
          <v-list-item>Our bread is made with love.</v-list-item>
          <v-list-item>We offer gluten-free options.</v-list-item>
          <v-list-item>Freshly baked every day.</v-list-item>
          <v-list-item>Visit us for the best pastries.</v-list-item>
          <v-list-item>Order online and pick up in store.</v-list-item>
        </v-list>
        <v-btn color="brown darken-1" dark @click="startNow">Start Now</v-btn>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <v-avatar size="200">
          <img :src="logo" alt="Logo" />
        </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import logo from '../assets/logo.png';

export default {
  name: 'Home',
  data() {
    return {
      logo,
    };
  },
  methods: {
    startNow() {
      this.$router.push('/products');
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
