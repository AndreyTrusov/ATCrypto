<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "NavItem",
  props: {
    name: {
      type: String,
      required: true
    },
    routeName: {
      type: String,
      required: true
    }
  }
});
</script>

<template>
  <li class="nav-item">
    <router-link
        class="nav-link"
        :to="{ name: routeName }"
        active-class="active"
    >
      {{ name }}
    </router-link>
  </li>
</template>

<style scoped>

</style>