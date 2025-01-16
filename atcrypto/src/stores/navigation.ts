import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        navLinks: [
            { name: 'Home', route: { name: 'Home' } },
            { name: 'About', route: { name: 'About' } },
            { name: 'Team', route: { name: 'Team' } },
            { name: 'Feedbacks', route: { name: 'FeedBacks' } }
        ],
        isNavOpen: false
    }),
    actions: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen
        }
    }
})