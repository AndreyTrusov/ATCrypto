import { defineStore } from 'pinia';

export const useTeamStore = defineStore('team', {
    state: () => ({
        teamMembers: [
            {
                name: 'Joseph Brown',
                position: 'Marketing Head',
                image: 'src/assets/images/team-1.jpg',
            },
            {
                name: 'Nancy White',
                position: 'Marketing Head',
                image: 'src/assets/images/team-2.jpg',
            },
            {
                name: 'Earl Martinez',
                position: 'Marketing Head',
                image: 'src/assets/images/team-3.jpg',
            },
            {
                name: 'Josephine Allard',
                position: 'Marketing Head',
                image: 'src/assets/images/team-4.jpg',
            },
            {
                name: 'Joseph Brown',
                position: 'Marketing Head',
                image: 'src/assets/images/team-1.jpg',
            },
            {
                name: 'Nancy White',
                position: 'Marketing Head',
                image: 'src/assets/images/team-2.jpg',
            },
            {
                name: 'Earl Martinez',
                position: 'Marketing Head',
                image: 'src/assets/images/team-3.jpg',
            },
            {
                name: 'Josephine Allard',
                position: 'Marketing Head',
                image: 'src/assets/images/team-4.jpg',
            },
        ],
    })
});
