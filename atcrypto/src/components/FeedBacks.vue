<script lang="ts">
import {defineComponent} from 'vue'
import InfoSection from "@/components/InfoSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import HeroBackground from "@/components/layout/HeroBackground.vue";
import CustomerSection from "@/components/feedback/CustomerSection.vue";
import HeaderSection from "@/components/HeaderSection.vue";

interface FeedbackData {
  isNavOpen: boolean;
}

export default defineComponent({
  name: "FeedBacks",
  components: {HeaderSection, CustomerSection, HeroBackground, FooterSection, InfoSection},
  data(): FeedbackData {
    return {
      isNavOpen: false,
    }
  },
})
</script>

<template>
  <div class="sub_page">
    <div class="hero_area">
      <HeroBackground/>

      <HeaderSection/>
    </div>
    <Suspense>
      <CustomerSection/>
    </Suspense>
    <div>
      <InfoSection/>
      <FooterSection/>
    </div>

  </div>
</template>

<style scoped>

</style>