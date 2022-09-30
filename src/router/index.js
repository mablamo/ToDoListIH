import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import CompraView from '../views/CompraView.vue';
import SharedView from '../views/SharedView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
  },
  {
    path: '/compra',
    name: 'compra',
    component: CompraView,
  },
  {
    path: '/shared',
    name: 'shared',
    component: SharedView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
