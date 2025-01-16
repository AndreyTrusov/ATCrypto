<template>
  <div class="hero_area">
    <HeroBackground/>

    <header class="header_section">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container">
          <router-link class="navbar-brand" to="/">
            <span>ATCrypto</span>
          </router-link>

          <button class="navbar-toggler" @click="navigationStore.toggleNav()">
            <span></span>
          </button>

          <div class="navbar-collapse" :class="{ 'collapse': !navigationStore.isNavOpen }">
            <ul class="navbar-nav">
              <li v-for="link in navigationStore.navLinks" :key="link.name" class="nav-item">
                <router-link class="nav-link" :to="link.route" active-class="active">
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>

    <section class="slider_section">
      <Carousel/>
    </section>
  </div>
</template>

<script>
import HeroBackground from "@/components/layout/HeroBackground.vue";
import {useNavigationStore} from "@/stores/navigation.ts";
import Carousel from "@/components/slider/Carousel.vue";

export default {
  name: 'HeroSection',
  setup() {
    const navigationStore = useNavigationStore();
    return {
      navigationStore
    };
  },
  components: {
    Carousel,
    HeroBackground
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>