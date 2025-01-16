<script lang="ts">
import {defineComponent} from 'vue'
import TeamMemberCard from "@/components/TeamMemberCard.vue";
import {useTeamStore} from "@/stores/team.ts";

export default defineComponent({
  name: "TeamSection",
  components: {TeamMemberCard},
  setup() {
    const teamStore = useTeamStore();
    return {teamStore};
  },
})
</script>

<template>
  <section class="team_section layout_padding">
    <div class="container-fluid">
      <div class="heading_container heading_center">
        <h2>Our <span>Team</span></h2>
      </div>
      <div class="team_container">
        <div class="row">
          <TeamMemberCard
              v-for="(member, index) in teamStore.teamMembers"
              :key="index"
              :name="member.name"
              :position="member.position"
              :image="member.image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>