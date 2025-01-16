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

  <section class="service_section layout_padding">
    <div class="service_container">
      <div class="container">
        <div class="heading_container heading_center">
          <h2>
            Our <span>Services</span>
          </h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
          </p>
        </div>
        <div class="row">
          <ServiceCard
              v-for="service in services"
              :key="service.id"
              :service="service"
          />
        </div>
      </div>
    </div>
  </section>

  <WhyChooseUs/>

  <div>
    <InfoSection/>
    <FooterSection/>
  </div>


</template>

<script>
import HeroBackground from "@/components/layout/HeroBackground.vue";
import {useNavigationStore} from "@/stores/navigation.ts";
import {useServiceStore} from "@/stores/services.ts";
import Carousel from "@/components/slider/Carousel.vue";
import ServiceCard from "@/components/service/ServiceCard.vue";
import InfoSection from "@/components/InfoSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import WhyChooseUs from "@/components/whyUs/WhyChooseUs.vue";

export default {
  name: 'HeroSection',
  setup() {
    const navigationStore = useNavigationStore();
    const serviceStore = useServiceStore()
    return {
      navigationStore,
      services: serviceStore.services,
    };
  },
  components: {
    WhyChooseUs,
    FooterSection,
    InfoSection,
    ServiceCard,
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