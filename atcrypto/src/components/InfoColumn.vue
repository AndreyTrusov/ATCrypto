
<script lang="ts">
import {defineComponent} from 'vue'
import {useNavigationStore} from "@/stores/navigation.ts";
import {useAuthStore} from "@/stores/auth.ts";

export default defineComponent({
  name: "InfoColumn",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  setup() {
    const navigationStore = useNavigationStore()
    const authStore = useAuthStore()

    const handleAction = (action: string) => {
      if (action === 'logout') {
        authStore.logout()
      }
    }

    return {
      navigationStore,
      handleAction
    }
  },
  computed: {
    columnClass() {
      return 'col-md-6 col-lg-3 info_col ' + (this.type === 'links' ? 'mx-auto' : '');
    },

    navLinks() {
      const navigationStore = useNavigationStore();
      return navigationStore.dynamicNavLinks;
    }
  }
})
</script>

<template>
  <div :class="columnClass">
    <template v-if="type === 'address'">
      <div class="info_contact">
        <h4>Address</h4>
        <div class="contact_link_box">
          <a href=""><i  aria-hidden="true"></i> <span>Location</span></a>
          <a href=""><i  aria-hidden="true"></i> <span>Call +01 1234567890</span></a>
          <a href=""><i  aria-hidden="true"></i> <span>demo@gmail.com</span></a>
        </div>
      </div>
    </template>

    <template v-else-if="type === 'info'">
      <div class="info_detail">
        <h4>Info</h4>
        <p>
          Necessary, making this the first true generator on the Internet. It uses a dictionary of over
          200 Latin words, combined with a handful.
        </p>
      </div>
    </template>

    <template v-else-if="type === 'links'">
      <div class="info_link_box">
        <h4>Links</h4>
        <div class="info_links">
          <ul>
            <li v-for="link in navigationStore.dynamicNavLinks" :key="link.name">
              <router-link
                  v-if="!link.type"
                  :to="link.route || { name: link.name }"
                  active-class="active"
              >
                {{ link.name }}
              </router-link>

              <button
                  v-else-if="link.type === 'button'"
                  @click="handleAction(link.action)"
              >
                {{ link.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <template v-else-if="type === 'subscribe'">
      <h4>Subscribe</h4>
      <form action="#">
        <input type="text" placeholder="Enter email" />
        <button type="submit">Subscribe</button>
      </form>
    </template>
  </div>
</template>

<style scoped>

</style>