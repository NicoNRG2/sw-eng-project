import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import Login from '../components/Login.vue'; 
import ProductList from '../components/ProductList.vue'
import Registration from '@/components/Registration.vue';
import ShoppingCart from '@/components/ShoppingCart.vue'
import Layout from '../components/Layout.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'HomePage',
        component: HomePage
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Registration
      },
      {
        path: 'products',
        name: 'ProductList',
        component: ProductList
      },
      {
        path: 'shoppingcart',
        name: 'ShoppingCart',
        component: ShoppingCart
      }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
