<script lang="ts">
import {defineComponent, ref, watch} from 'vue'

export default defineComponent({
  name: "ErrorSnackbar",
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'error'
    },
    timeout: {
      type: Number,
      default: 3000
    },
    position: {
      type: String,
      default: 'top'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isVisible = ref(props.modelValue);

    watch(() => props.modelValue, (newValue) => {
      isVisible.value = newValue;
    });

    watch(isVisible, (newValue) => {
      emit('update:modelValue', newValue);
    });

    const closeSnackbar = () => {
      isVisible.value = false;
    };

    return {
      isVisible,
      closeSnackbar
    };
  }
})
</script>

<template>
  <v-snackbar
      v-model="isVisible"
      :color="color"
      :timeout="timeout"
      :v-position="position"
  >
    {{ message }}
    <template #actions>
      <v-btn text="" @click="closeSnackbar">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>

</style>