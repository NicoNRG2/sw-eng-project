import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../components/Layout.vue';
import HomePage from '../components/HomePage.vue';
import Login from '../components/Login.vue'; 

const routes = [
  {
    path: '/',
    component: MainLayout,
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
      }/*,
      {
        path: 'products',
        name: 'ProductList',
        component: ProductList
      } */
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
