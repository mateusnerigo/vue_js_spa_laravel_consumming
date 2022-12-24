import {
  createRouter,
  createWebHistory
} from 'vue-router';

import Guard from '@/services/middleware';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import LoginSuccessView from '@/views/LoginSuccessView.vue';
import LogoutView from '@/views/LogoutView.vue';
import SalePointsView from '@/views/salePoints/SalePointsView.vue';
import ClientsView from '@/views//clients/ClientsView.vue';
import ProductsView from '@/views/products/ProductsView.vue';
import SalesView from '@/views/sales/SalesView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/loginSuccess',
    name: 'LoginSuccess',
    component: LoginSuccessView
  },
  {
    path: '/logout',
    name: 'LogoutView',
    component: LogoutView
  },
  {
    path: '/salePoints',
    name: 'SalePoints',
    component: SalePointsView,
    beforeEnter: Guard.auth,
  },
  {
    path: '/clients',
    name: 'Clients',
    component: ClientsView,
    beforeEnter: Guard.auth,
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsView,
    beforeEnter: Guard.auth,
  },
  {
    path: '/sales',
    name: 'Sales',
    component: SalesView,
    beforeEnter: Guard.auth,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
