import {
  createRouter,
  createWebHistory
} from 'vue-router'

import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/salePoints',
    name: 'SalePoints',
    component: () => import(/* webpackChunkName: "salePoints" */ '../views/salePoints/SalePointsView.vue')
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import(/* webpackChunkName: "clients" */ '../views/clients/ClientsView.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/products/ProductsView.vue')
  },
  {
    path: '/sales',
    name: 'Sales',
    component: () => import(/* webpackChunkName: "sales" */ '../views/sales/SalesView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
