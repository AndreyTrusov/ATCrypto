import {createRouter, createWebHistory} from 'vue-router';
import Home from '../components/HomePage.vue';
import About from '../components/AboutPage.vue';
import Team from '../components/team/TeamPage.vue';
import FeedBacks from '../components/FeedBacks.vue';
import Login from "@/components/authentication/Login.vue";
import Registration from "@/components/authentication/Registration.vue";
import Dashboard from "@/components/personalinfo/Dashboard.vue";
import {useAuthStore} from "@/stores/auth.ts";
import Wallet from "@/components/personalinfo/Wallet.vue";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/about', name: 'About', component: About},
    {path: '/team', name: 'Team', component: Team},
    {path: '/feedbacks', name: 'FeedBacks', component: FeedBacks},
    {path: '/login', name: 'Login', component: Login},
    {path: '/register', name: 'Registration', component: Registration},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: {requiresAuth: true}},
    {path: '/wallet', name: 'Wallet', component: Wallet, meta: {requiresAuth: true}},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (!to.name) {
        next({ name: 'Home' })
        return
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'Login' })
    } else if (['Login', 'Registration'].includes(to.name as string) && authStore.isAuthenticated) {
        next({ name: 'Home' })
    } else {
        next()
    }
})

export default router

