<script lang="ts">
import {defineComponent} from 'vue'
import InfoSection from "@/components/InfoSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import HeroBackground from "@/components/layout/HeroBackground.vue";
import {useNavigationStore} from "@/stores/navigation.ts";
import CustomerSection from "@/components/feedback/CustomerSection.vue";
import HeaderSection from "@/components/HeaderSection.vue";

export default defineComponent({
  name: "FeedBacks",
  components: {HeaderSection, CustomerSection, HeroBackground, FooterSection, InfoSection},
  data() {
    return {
      isNavOpen: false,
    }
  },
  setup() {
    const navigationStore = useNavigationStore();
    return {
      navigationStore
    };
  },
})
</script>

<template>
  <div class="sub_page">
    <div class="hero_area">
      <HeroBackground/>

      <HeaderSection />
    </div>

    <CustomerSection/>

    <div>
      <InfoSection/>
      <FooterSection/>
    </div>
  </div>
</template>

<style scoped>

</style>