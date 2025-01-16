import { defineStore } from 'pinia';

export const useServiceStore = defineStore('services', {
    state: () => ({
        services: [
            {
                id: 1,
                title: 'Currency Wallet',
                description:
                    'Fact that a reader will be distracted by the readable content of a page when looking at its layout.',
                imageSrc: '/src/assets/images/s1.png',
                link: ''
            },
            {
                id: 2,
                title: 'Security Storage',
                description:
                    'Fact that a reader will be distracted by the readable content of a page when looking at its layout.',
                imageSrc: '/src/assets/images/s2.png',
                link: ''
            },
            {
                id: 3,
                title: 'Expert Support',
                description:
                    'Fact that a reader will be distracted by the readable content of a page when looking at its layout.',
                imageSrc: '/src/assets/images/s3.png',
                link: ''
            },
            {
                id: 4,
                title: 'Expert Support',
                description:
                    'Fact that a reader will be distracted by the readable content of a page when looking at its layout.',
                imageSrc: '/src/assets/images/s3.png',
                link: ''
            }
        ]
    })
});
