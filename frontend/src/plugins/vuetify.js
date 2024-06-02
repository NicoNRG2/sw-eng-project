/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import { createApp } from 'vue';
import { createVuetify } from 'vuetify/lib/framework';

// CSS Loader
import 'vuetify/styles'; 

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
})
