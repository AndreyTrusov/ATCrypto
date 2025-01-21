<script lang="ts">
import {defineComponent} from 'vue'
import InfoSection from "@/components/InfoSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import HeroBackground from "@/components/layout/HeroBackground.vue";
import TeamMemberCard from "@/components/team/TeamMemberCard.vue";
import TeamSection from "@/components/team/TeamSection.vue";
import HeaderSection from "@/components/HeaderSection.vue";

export default defineComponent({
  name: "TeamPage",
  components: {HeaderSection, TeamSection, TeamMemberCard, HeroBackground, FooterSection, InfoSection},
  data() {
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

      <HeaderSection />
    </div>


    <div>
      <TeamSection/>
    </div>

    <div>
      <InfoSection/>
      <FooterSection/>
    </div>


  </div>
</template>


<style scoped>

</style>