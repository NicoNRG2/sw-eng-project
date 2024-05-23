<template>
  <v-app>
    <v-row>
      <v-col cols="6">
        <v-card class="elevation-10" color="brown darken-4" dark>
          <v-card-title class="white--text">
            What you can find in Bakery4You:
          </v-card-title>
          <v-card-text>
            <ul class="white--text list-style-disc">
              <li>Easy products consultation;</li>
              <li>Always up-to-date products availability;</li>
              <li>...</li>
              <li>...</li>
              <li>...</li>
            </ul>
          </v-card-text>
          <v-card-title class="white--text">
            Getting started:
          </v-card-title>
          <v-card-text>
            You can consult the products list even if you are not registered yet. If you want to purchase something, let's log in:
            <ul class="white--text list-style-disc">
              <li>...</li>
              <li>...</li>
            </ul>
          </v-card-text>
        </v-card>
        <v-btn @click="goToLogin" color="brown darken-4" dark large>Get started</v-btn>
      </v-col>
      <v-col cols="6">
        <div style="text-align:right">
          <img :src="logo" alt="" style="max-width:60%; height: auto; margin-top: 25vh">
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  name: 'HomePage',
  data() {
    return {
      logo,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style>
@import 'vuetify/styles';

.cursor-pointer {
  cursor: pointer;
}

.list-style-disc {
  list-style-type: disc;
}

.v-card {
  width: 100%;
  height: 40%;
  max-width: 500px;
  margin-left: -25px;
  padding-left: 25vw;
  padding-top: -50vh;
  margin-top: 15vh;
  margin-bottom: 15vh;
}
</style>
