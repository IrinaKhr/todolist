import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import SignUp from '../components/SignUp.vue';
import ThankYou from '../components/ThankYou.vue';

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
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/thankyou',
    name: 'thankyou',
    component: ThankYou,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
