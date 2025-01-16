import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import About from '../components/AboutPage.vue';
import Team from '../components/team/TeamPage.vue';
import FeedBacks from '../components/FeedBacks.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/team', name: 'Team', component: Team },
  { path: '/feedbacks', name: 'FeedBacks', component: FeedBacks },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
