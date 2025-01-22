<script lang="ts">
import {defineComponent} from 'vue'
import {type Transaction, useTransactionStore} from "@/stores/transactionStore.ts";

const API_URL = 'http://localhost:3000'

export default defineComponent({
  name: "Transaction",
  setup() {
    const store = useTransactionStore();
    return { store };
  },

  data() {
    return {
      transactions: [] as Transaction[],
      loading: false,
      error: null as string | null
    }
  },

  async created() {
    await this.loadTransactions();
  },

  methods: {
    async loadTransactions() {
      try {
        await this.store.fetchTransactions();
        this.transactions = this.store.transactions;
        this.loading = this.store.loading;
        this.error = this.store.error;
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }
  }
});
</script>

<template>

  <v-card max-width="840" class="mx-auto" style="border-radius: 5px; box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);">
    <v-card-title>Your Crypto Transactions</v-card-title>

    <v-card-text>
      <v-alert v-if="error" type="error" dense>{{ error }}</v-alert>

      <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
      />

      <v-list v-else>
        <v-list-item
            v-for="tx in transactions"
            :key="tx.id"
        >
          <v-list-item-title>
            {{ tx.crypto_name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Amount: {{ tx.amount }}
            Bought at: ${{ tx.price_at_purchase }}
            Date: {{ new Date(tx.created_at).toLocaleDateString() }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>