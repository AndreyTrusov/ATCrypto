<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useAuthStore} from "@/stores/auth.ts";
import ErrorSnackbar from "@/components/errors/ErrorSnackbar.vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "Login",
  components: {
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
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
            type="email"
            v-model="email"
            id="email"
            required
            :disabled="isLoading"
            class="form-input"
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
        />
      </div>
      <button
          type="submit"
          :disabled="isLoading"
          class="login-button"
      >
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    <p class="register-link">
      Don't have an account? <router-link to="/register">Register here</router-link>.
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
.login {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
}

.login h1 {
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

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #534caf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.login-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.login-button:hover:not(:disabled) {
  background-color: #45a049;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link a {
  color: #4CAF50;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>