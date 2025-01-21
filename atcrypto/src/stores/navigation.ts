import { defineStore } from 'pinia'
import Dashboard from "@/components/personalinfo/Dashboard.vue";
import Wallet from "@/components/personalinfo/Wallet.vue";
import {useAuthStore} from "@/stores/auth.ts";

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        isNavOpen: false,
        commonNavLinks: [
            { name: 'Home', route: { name: 'Home' } },
            { name: 'About', route: { name: 'About' } },
            { name: 'Team', route: { name: 'Team' } },
            { name: 'Feedbacks', route: { name: 'FeedBacks' } },
        ],
        authenticatedLinks: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: { requiresAuth: true }
            },
            {
                path: '/wallet',
                name: 'Wallet',
                component: Wallet,
                meta: { requiresAuth: true }
            },
            {
                name: 'Logout',
                type: 'button',
                action: 'logout'
            },
        ],
        guestLinks: [
            { name: 'Login', route: { name: 'Login' } },
        ],
    }),

    actions: {
        toggleNav(): void {
            this.isNavOpen = !this.isNavOpen;
        }
    },

    getters: {
        dynamicNavLinks(state) {
            const authStore = useAuthStore();

            if (authStore.isAuthenticated) {
                return [
                    ...state.commonNavLinks,
                    ...state.authenticatedLinks
                ];
            } else {
                return [
                    ...state.commonNavLinks,
                    ...state.guestLinks
                ];
            }
        }
    }
});