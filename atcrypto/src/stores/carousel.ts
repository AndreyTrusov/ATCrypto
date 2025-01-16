import { defineStore } from 'pinia';

export const useCarouselStore = defineStore('carousel', {
    state: () => ({
        carouselItems: [
            {
                title: '1 Crypto Currency',
                description:
                    '1 Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.',
                imageSrc: 'src/assets/images/slider-img.png',
                buttonLabel: 'Read More',
                buttonLink: ''
            },
            {
                title: '2 Crypto Currency',
                description:
                    '2 Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.',
                imageSrc: 'src/assets/images/slider-img.png',
                buttonLabel: 'Read More',
                buttonLink: ''
            },
            {
                title: '3 Crypto Currency',
                description:
                    '3 Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.',
                imageSrc: 'src/assets/images/slider-img.png',
                buttonLabel: 'Read More',
                buttonLink: ''
            }
        ]
    })
});
