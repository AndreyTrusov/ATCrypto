<script>
import { useCarouselStore } from '@/stores/carousel';
import CarouselItem from './CarouselItem.vue';
import { ref } from 'vue';

export default {
  name: 'Carousel',
  components: {
    CarouselItem
  },
  setup() {
    const carouselStore = useCarouselStore();
    const activeIndex = ref(0);

    const setActiveIndex = (index) => {
      activeIndex.value = index;
    };

    const prevSlide = () => {
      activeIndex.value =
          activeIndex.value === 0
              ? carouselStore.carouselItems.length - 1
              : activeIndex.value - 1;
    };

    const nextSlide = () => {
      activeIndex.value =
          (activeIndex.value + 1) % carouselStore.carouselItems.length;
    };

    return {
      carouselItems: carouselStore.carouselItems,
      activeIndex,
      setActiveIndex,
      prevSlide,
      nextSlide
    };
  }
};
</script>

<template>
  <div id="customCarousel1" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <CarouselItem
          v-for="(item, index) in carouselItems"
          :key="index"
          :item="item"
          :is-active="index === activeIndex"
      />
    </div>

    <ol class="carousel-indicators">
      <li
          v-for="(item, index) in carouselItems"
          :key="index"
          :data-bs-slide-to="index"
          :class="{ active: index === activeIndex }"
          @click="setActiveIndex(index)"
      ></li>
    </ol>

  </div>
</template>

<style scoped>

</style>