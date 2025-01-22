<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useAuthStore} from "@/stores/auth.ts";
import ErrorSnackbar from "@/components/errors/ErrorSnackbar.vue";
import {useRouter} from "vue-router";
import HeaderSection from "@/components/HeaderSection.vue";
import HeroBackground from "@/components/layout/HeroBackground.vue";
import FooterSection from "@/components/FooterSection.vue";

export default defineComponent({
  name: "Login",
  components: {
    FooterSection,
    HeroBackground, HeaderSection,
    ErrorSnackbar
  },

  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const showError = ref(false);
    const errorMessage = ref('');

    const handleLogin = async () => {
      isLoading.value = true;
      showError.value = false;

      try {
        await authStore.login(email.value, password.value);
        await router.push('/');
      } catch (error: any) {
        errorMessage.value = error?.response?.data?.message ||
            'Login failed. Please check your credentials.';
        showError.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      isLoading,
      showError,
      errorMessage,
      handleLogin,
    };
  }
})
</script>

<template>
  <div class="sub_page" style="background-color: lightgray">
    <div class="hero_area" style="margin-bottom: 100px;">
      <HeroBackground/>
      <HeaderSection/>
    </div>

    <v-container fluid class="fill-height" style="margin-bottom: 100px;">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4" lg="3">
          <v-card class="mx-auto pa-4" elevation="8" rounded="lg">
            <v-card-title class="text-h4 font-weight-bold text-center pb-4">
              Login
            </v-card-title>

            <v-card-text>
              <v-form @submit.prevent="handleLogin" class="mt-4">
                <v-text-field
                    v-model="email"
                    :disabled="isLoading"
                    label="Email"
                    variant="outlined"
                    :rules="[v => !!v || 'Email is required']"
                    prepend-inner-icon="mdi-email"
                    class="mb-4"
                />

                <v-text-field
                    v-model="password"
                    :disabled="isLoading"
                    label="Password"
                    variant="outlined"
                    :rules="[v => !!v || 'Password is required']"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    class="mb-6"
                />

                <v-btn
                    :loading="isLoading"
                    :disabled="isLoading"
                    color="primary"
                    size="large"
                    block
                    type="submit"
                    elevation="2"
                    class="mb-6 text-subtitle-1"
                    rounded
                >
                  {{ isLoading ? 'Logging in...' : 'LOGIN' }}
                </v-btn>
              </v-form>
            </v-card-text>

            <v-divider class="mb-4"></v-divider>

            <div class="text-center mb-4">
              <p class="text-grey-darken-1 mb-2">Don't have an account?</p>
              <v-btn
                  variant="text"
                  color="primary"
                  :to="'/register'"
                  class="text-none font-weight-bold"
              >
                REGISTER HERE
              </v-btn>
            </div>
          </v-card>

          <v-snackbar
              v-model="showError"
              :timeout="5000"
              color="error"
              location="top"
              rounded="pill"
          >
            {{ errorMessage }}
            <template v-slot:actions>
              <v-btn
                  color="white"
                  variant="text"
                  @click="showError = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
    <div>
      <FooterSection/>
    </div>
  </div>
</template>

<style scoped>
</style>