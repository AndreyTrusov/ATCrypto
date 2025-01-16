<script lang="ts">
import {defineComponent} from 'vue'
import CustomerTestimonial from "@/components/feedback/CustomerTestimonial.vue";
import {useCustomerStore} from "@/stores/customerStore.ts";

export default defineComponent({
  name: "CustomerSection",
  components: {CustomerTestimonial},
  setup() {
    const customerStore = useCustomerStore();
    return { customerStore };
  },
})
</script>

<template>
  <section class="client_section layout_padding">
    <div class="container">
      <div class="heading_container heading_center psudo_white_primary mb_45">
        <h2>
          What says our <span>Customers</span>
        </h2>
      </div>
      <div class="carousel-wrap">
          <CustomerTestimonial
              v-for="(testimonial, index) in customerStore.testimonials"
              :key="index"
              :name="testimonial.name"
              :position="testimonial.position"
              :image="testimonial.image"
              :quote="testimonial.quote"
          />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>