<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useAuthStore} from "@/stores/auth.ts";
import ErrorSnackbar from "@/components/errors/ErrorSnackbar.vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "Registration",
  components: {
    ErrorSnackbar
  },

  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const username = ref('');
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const showError = ref(false);
    const errorMessage = ref('');

    const handleRegister = async () => {
      isLoading.value = true;
      showError.value = false;

      try {
        await authStore.register(
            username.value,
            email.value,
            password.value
        )
        await router.push('/')
      } catch (error: any) {
        errorMessage.value = error?.response?.data?.message ||
            'Registration failed. Please try again.'
        showError.value = true
      } finally {
        isLoading.value = false
      }
    };

    return {
      username,
      email,
      password,
      isLoading,
      showError,
      errorMessage,
      handleRegister,
    };
  }
})
</script>

<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
            type="text"
            v-model="username"
            id="username"
            required
            :disabled="isLoading"
            class="form-input"
            autocomplete="username"
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
            type="email"
            v-model="email"
            id="email"
            required
            :disabled="isLoading"
            class="form-input"
            autocomplete="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
            type="password"
            v-model="password"
            id="password"
            required
            :disabled="isLoading"
            class="form-input"
            autocomplete="new-password"
            minlength="8"
        />
      </div>
      <button
          type="submit"
          :disabled="isLoading"
          class="register-button"
      >
        {{ isLoading ? 'Creating Account...' : 'Register' }}
      </button>
    </form>
    <p class="login-link">
      Already have an account? <router-link to="/login">Login here</router-link>.
    </p>

    <ErrorSnackbar
        v-model="showError"
        :message="errorMessage"
        color="error"
        position="top"
        :timeout="5000"
    />
  </div>
</template>


<style scoped>
.register {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
}

.register h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-input:focus {
  outline: none;
  border-color: #666;
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #534caf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.register-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.register-button:hover:not(:disabled) {
  background-color: #45a049;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>