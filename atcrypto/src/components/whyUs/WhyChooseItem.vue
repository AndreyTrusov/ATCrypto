<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "WhyChooseItem",
  props: {
    title: String,
    description: String,
    image: String,
  }
})
</script>

<template>
  <div class="box">
    <div class="img-box">
      <img :src="image" alt="" />
    </div>
    <div class="detail-box">
      <h5>{{ title }}</h5>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>