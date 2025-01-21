<script lang="ts">
import {defineComponent, onMounted} from 'vue'
import CustomerTestimonial from "@/components/feedback/CustomerTestimonial.vue";
import {useFeedbackStore} from "@/stores/feedback.ts";
import {storeToRefs} from "pinia";

export default defineComponent({
  name: "CustomerSection",
  components: { CustomerTestimonial },

  async setup() {
    const feedbackStore = useFeedbackStore();
    const { feedbacks } = storeToRefs(feedbackStore);

    console.log(feedbacks.value);

    onMounted(async () => {
      try {
        await feedbackStore.fetchFeedbacks();
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    });

    return {
      feedbacks,
    };
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

      <div v-if="feedbacks.length > 0" class="carousel-wrap">
        <CustomerTestimonial
            v-for="feedback in feedbacks"
            :key="feedback.id"
            :name="feedback.name"
            :position="feedback.position"
            :image="feedback.image"
            :quote="feedback.quote"
        />
      </div>
      <div v-else>
        <p>No feedbacks available at the moment.</p>
      </div>
    </div>
  </section>
</template>


<style scoped>

</style>