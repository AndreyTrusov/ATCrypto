import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
    state: () => ({
        errorSnackbar: false,
        errorMessage: '',
    }),
    actions: {
        showError(message: string) {
            this.errorMessage = message;
            this.errorSnackbar = true;
        },
        closeError() {
            this.errorSnackbar = false;
        },
    },
});