<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CustomerTestimonial",
  props: {
    name: String,
    position: String,
    image: String,
    quote: String,
  },
})
</script>

<template>
  <div class="item">
    <div class="box">
      <div class="img-box">
        <img :src="image" alt="Customer Image" class="box-img">
      </div>
      <div class="detail-box">
        <div class="client_id">
          <div class="client_info">
            <h6>{{ name }}</h6>
            <p>{{ position }}</p>
          </div>
        </div>
        <p>{{ quote }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>