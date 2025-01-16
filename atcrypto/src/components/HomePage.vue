<template>
  <div class="hero_area">
    <HeroBackground/>

    <HeaderSection />

    <section class="slider_section">
      <Carousel/>
    </section>
  </div>

  <ServiceSection />

  <WhyChooseUs/>

  <div>
    <InfoSection/>
    <FooterSection/>
  </div>

</template>

<script>
import HeroBackground from "@/components/layout/HeroBackground.vue";
import Carousel from "@/components/slider/Carousel.vue";
import InfoSection from "@/components/InfoSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import WhyChooseUs from "@/components/whyUs/WhyChooseUs.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import ServiceSection from "@/components/service/ServiceSection.vue";

export default {
  name: 'HeroSection',
  components: {
    HeaderSection,
    WhyChooseUs,
    FooterSection,
    InfoSection,
    Carousel,
    HeroBackground,
    ServiceSection,
  }
}
</script>

<style scoped>

</style>