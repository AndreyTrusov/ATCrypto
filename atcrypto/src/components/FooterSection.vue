<script lang="ts">
import {defineComponent, nextTick} from 'vue'

export default defineComponent({
  name: "FooterSection",
  mounted() {
    nextTick(() => {
      const displayYear = document.getElementById('displayYear');
      if (displayYear) {
        displayYear.textContent = String(new Date().getFullYear());
      } else {
        console.error('Element with id "displayYear" not found');
      }
    });
  },
})
</script>

<template>
  <section class="footer_section">
    <div class="container">
      <p>
        &copy; <span id="displayYear"></span> All Rights Reserved By
        <a href="https://html.design/">Free Html Templates</a>
      </p>
    </div>
  </section>
</template>

<style scoped>

</style>