<script lang="ts">
import {defineComponent} from 'vue'
import WhyChooseItem from "@/components/whyUs/WhyChooseItem.vue";
import {useWhyChooseStore} from "@/stores/whyChooseStore.ts";

export default defineComponent({
  name: "WhyChooseUs",
  components: {WhyChooseItem},
  setup() {
    const whyChooseStore = useWhyChooseStore();
    return {whyChooseStore};
  },
})
</script>

<template>
  <section class="why_section layout_padding">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          Why Choose <span>Us</span>
        </h2>
      </div>
      <div class="why_container">
        <div class="row">
          <WhyChooseItem
              v-for="(reason, index) in whyChooseStore.reasons"
              :key="index"
              :title="reason.title"
              :description="reason.description"
              :image="reason.image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>