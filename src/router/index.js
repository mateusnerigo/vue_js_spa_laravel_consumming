import {
  createRouter,
  createWebHistory
} from 'vue-router'

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SalePointsView from '../views/salePoints/SalePointsView.vue';
import ClientsView from '../views//clients/ClientsView.vue';
import ProductsView from '../views/products/ProductsView.vue';
import SalesView from '../views/sales/SalesView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/salePoints',
    name: 'SalePoints',
    component: SalePointsView
  },
  {
    path: '/clients',
    name: 'Clients',
    component: ClientsView
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsView
  },
  {
    path: '/sales',
    name: 'Sales',
    component: SalesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
