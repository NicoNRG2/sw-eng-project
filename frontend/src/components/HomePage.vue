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
            <v-btn color="brown darken-4" dark large>Get started</v-btn>
          </v-col>
          <v-col cols="6">
            <div style="text-align:right">
              <img :src="logo" alt="" style="max-width:30%; height: auto; margin-top: -350px">
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
    height: 100%;
    max-width: 400px;
    margin-left: -35px;
    padding-left: 35px;
    padding-top: -50px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  </style>