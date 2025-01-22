<script lang="ts">
import {computed, defineComponent} from 'vue'
import {useNavigationStore} from "@/stores/navigation.ts";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.ts";

interface NavLink {
  name: string;
  type?: 'button';
  route?: {
    name: string;
  };
  action?: string;
  path?: string;
  component?: any;
  meta?: {
    requiresAuth: boolean;
  };
}

export default defineComponent({
  name: "HeaderSection",
  setup() {
    const navigationStore = useNavigationStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const toggleNav = () => {
      navigationStore.toggleNav();
    };

    const handleNavigation = async (link: NavLink) => {
      if (link.type === 'button' && link.action === 'logout') {
        await authStore.logout();
        navigationStore.isNavOpen = false;
        await router.push({ name: 'Home' });
        return;
      }

      if (link.route) {
        navigationStore.isNavOpen = false;
      }
    };

    return {
      isNavOpen: computed(() => navigationStore.isNavOpen),
      navLinks: computed(() => navigationStore.dynamicNavLinks as NavLink[]),
      toggleNav,
      handleNavigation,
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

        <button
            class="navbar-toggler"
            type="button"
            @click="toggleNav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
            id="navbarSupportedContent"
            class="collapse navbar-collapse"
            :class="{ 'show': isNavOpen }"
        >
          <ul class="navbar-nav ml-auto">
            <li
                v-for="link in navLinks"
                :key="link.name"
                class="nav-item"
            >
              <template v-if="link.type === 'button'">
                <button
                    class="nav-link btn btn-link"
                    @click="handleNavigation(link)"
                >
                  {{ link.name }}
                </button>
              </template>
              <router-link
                  v-else
                  class="nav-link"
                  :to="link.route?.name ? { name: link.route.name } : { name: link.name }"
                  @click="handleNavigation(link)"
                  active-class="active"
              >
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