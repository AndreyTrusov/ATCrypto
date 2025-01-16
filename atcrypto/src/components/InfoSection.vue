<script lang="ts">
import {defineComponent} from 'vue'
import InfoColumn from "@/components/InfoColumn.vue";

export default defineComponent({
  name: "InfoSection",
  components: {InfoColumn}
})
</script>

<template>
  <section class="info_section layout_padding2">
    <div class="container">
      <div class="row">
        <InfoColumn type="address" />
        <InfoColumn type="info" />
        <InfoColumn type="links" />
        <InfoColumn type="subscribe" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>