<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TeamMemberCard",
  props: {
    name: String,
    position: String,
    image: String,
    socialLinks: Array,
  },
})
</script>

<template>
  <div class="col-lg-3 col-sm-6">
    <div class="box">
      <div class="img-box">
        <img :src="image" class="img1" alt="team member">
      </div>
      <div class="detail-box">
        <h5>{{ name }}</h5>
        <p>{{ position }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>