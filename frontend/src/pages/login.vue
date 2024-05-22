<template>
  <v-app>
    <v-container>
      <v-app-bar app color="brown lighten-1" dark>
        <v-toolbar-title @click="handleClick" class="cursor-pointer">Bakery4You</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text v-for="link in links" :key="link.text" :to="link.route">{{ link.text }}</v-btn>
      </v-app-bar>
      <v-row justify="center" class="mt-5">
        <v-col cols="12" md="6">
          <v-card class="elevation-10" color="brown darken-4" dark>
            <v-card-title class="white--text">Login</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="Email" type="email" required></v-text-field>
                <v-text-field label="Password" type="password" required></v-text-field>
                <v-btn color="brown lighten-1" class="mt-3" @click="login">Login</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
  name: 'Login',
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
  methods: {
    handleClick() {
      this.$router.push('/');
    },
    login() {
      // Handle login logic here
      console.log('Logging in...');
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}

.v-card {
  max-width: 400px;
  margin: auto;
}
</style>
