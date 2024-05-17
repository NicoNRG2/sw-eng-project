<template>
  <v-app>
    <Navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
@import '@mdi/font/css/materialdesignicons.css';
@import 'vuetify/styles';
</style>
