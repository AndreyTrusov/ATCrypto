<script lang="ts">
import {defineComponent} from 'vue'
import ServiceCard from "@/components/service/ServiceCard.vue";
import {useServiceStore} from "@/stores/services.ts";

export default defineComponent({
  name: "Service",
  components: {ServiceCard},
  setup() {
    const serviceStore = useServiceStore()
    return {
      services: serviceStore.services,
    };
  },
})
</script>

<template>
  <section class="service_section layout_padding">
    <div class="service_container">
      <div class="container">
        <div class="heading_container heading_center">
          <h2>
            Our <span>Services</span>
          </h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
          </p>
        </div>
        <div class="row">
          <ServiceCard
              v-for="service in services"
              :key="service.id"
              :service="service"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>