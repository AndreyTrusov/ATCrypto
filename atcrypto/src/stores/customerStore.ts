import { defineStore } from 'pinia';

export const useCustomerStore = defineStore('customers', {
    state: () => ({
        testimonials: [
            {
                name: 'LusDen',
                position: 'magna aliqua. Ut',
                image: '/src/assets/images/client1.jpg',
                quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',
            },
            {
                name: 'Zen Court',
                position: 'magna aliqua. Ut',
                image: '/src/assets/images/client2.jpg',
                quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',
            },
            {
                name: 'LusDen',
                position: 'magna aliqua. Ut',
                image: '/src/assets/images/client1.jpg',
                quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',
            },
            {
                name: 'Zen Court',
                position: 'magna aliqua. Ut',
                image: '/src/assets/images/client2.jpg',
                quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',
            },
        ],
    })
});
