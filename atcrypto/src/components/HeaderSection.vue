<script lang="ts">
import {defineComponent} from 'vue'
import {useNavigationStore} from "@/stores/navigation.ts";

export default defineComponent({
  name: "HeaderSection",
  setup() {
    const navigationStore = useNavigationStore();

    const toggleNav = () => {
      navigationStore.toggleNav();
    };

    return {
      isNavOpen: navigationStore.isNavOpen,
      navLinks: navigationStore.navLinks,
      toggleNav,
    };
  },
})
</script>

<template>
  <header class="header_section">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg custom_nav-container">
        <router-link class="navbar-brand" to="/">
          <span>ATCrypto</span>
        </router-link>

        <button class="navbar-toggler" @click="toggleNav">
          <span></span>
        </button>

        <div class="navbar-collapse" :class="{ 'collapse': !isNavOpen }">
          <ul class="navbar-nav">
            <li v-for="link in navLinks" :key="link.name" class="nav-item">
              <router-link class="nav-link" :to="link.route" active-class="active">
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>