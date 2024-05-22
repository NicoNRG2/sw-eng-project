
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
//import Home from '../components/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

const routes = [
  /*{
    path: '/',
    name: 'Home',
    component: Home,
  },*/
  {
    path: '/login',
    name: 'Getting started',
    component: () => import('../pages/login.vue'),
  },
  {
    path: '/gluten-free',
    name: 'GlutenFree',
    component: () => import('../pages/GlutenFree.vue'),
  },
  {
    path: '/bread',
    name: 'Bread',
    component: () => import('../pages/Bread.vue'),
  },
  {
    path: '/wholemeal-flour',
    name: 'WholemealFlour',
    component: () => import('../pages/WholemealFlour.vue'),
  },
  {
    path: '/fresh-pasta',
    name: 'FreshPasta',
    component: () => import('../pages/FreshPasta.vue'),
  },
  {
    path: '/sweets',
    name: 'Sweets',
    component: () => import('../pages/Sweets.vue'),
  },
  {
    path: '/savory',
    name: 'Savory',
    component: () => import('../pages/Savory.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../pages/Cart.vue'),
  },
];

export default router;
