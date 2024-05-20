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

      <v-row>
        <!-- Left side with indications-->
        <v-col cols="6">

          <v-card class="elevation-10" color="brown darken-4" dark>
            
            <v-card-title class="white--text">
              What you can find in Bakery4You:
            </v-card-title>

            <v-cart-text>
              <ul class="white--text list-style-disc">

                <li> Easy products consultation;</li>
                <li> Always up-to-date products availability;</li>
                <li> ...</li>
                <li> ...</li>
                <li> ...</li>
              </ul>
            </v-cart-text>

            <v-card-title class="white--text">
              Getting started:
            </v-card-title>

            <v-cart-text>
              You can consult the products list evan if you are not registered yet.
              If you want to purchase something, let's log in:

              <ul class="white--text list-style-disc">
                <li> ...</li>
                <li> ...</li>
              </ul>
            </v-cart-text>

          </v-card>


          <v-btn color="brown darken-4" dark large>Get started</v-btn>

        </v-col>

        <!-- Right side with Bakery4You logo -->
        <v.col cols="6">
          <div style="text-align:right">
            <img :src="logo" alt="" style="max-width:30%; height: auto; margin-top: -350px">
          </div>
        </v.col>
      </v-row>
      
    </v-container>
  </v-app>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  name: 'App',
  data() {
    return {
      logo,
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

<style>
  .list-style-disc{
    list-style-type: disc;
  }
</style>

<style>
.v-card {
  width: 100%;
  height: 100%;
  max-width: 400px;
  margin-left: -35px;
  padding-left: 35px;
  padding-top: -50px;
  margin-top: 50px;

  margin-bottom: 50px;

}
</style>
