import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import About from '../components/AboutPage.vue';
import Team from '../components/TeamPage.vue';
import OurServices from '../components/OurServices.vue';
import FeedBacks from '../components/FeedBacks.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/team', name: 'Team', component: Team },
  // { path: '/services', name: 'OurServices', component: OurServices },
  { path: '/feedbacks', name: 'FeedBacks', component: FeedBacks },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
