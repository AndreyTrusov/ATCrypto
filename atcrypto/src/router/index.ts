import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import About from '../components/AboutPage.vue';
import Team from '../components/TeamPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/team', name: 'Team', component: Team },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
