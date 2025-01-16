<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ServiceCard",
  props: {
    service: {
      type: Object,
      required: true
    }
  }
})
</script>

<template>
  <div class="col-md-4">
    <div class="box">
      <div class="img-box">
        <img :src="service.imageSrc" :alt="service.title" />
      </div>
      <div class="detail-box">
        <h5>{{ service.title }}</h5>
        <p>{{ service.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>