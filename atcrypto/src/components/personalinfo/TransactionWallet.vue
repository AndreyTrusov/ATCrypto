<script lang="ts">
import {defineComponent} from 'vue'
import axios from 'axios';

interface Transaction {
  id: number;
  crypto_id: number;
  amount: number;
  price_at_purchase: number;
  created_at: string;
  crypto_name: string;
}

const API_URL = 'http://localhost:3000'

export default defineComponent({
  name: "Transaction",
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
        this.loading = true;
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/transactions/crypto`, {
          headers: { Authorization: `${token}` }
        });
        this.transactions = response.data;
      } catch (error) {
        this.error = 'Failed to load transactions';
      } finally {
        this.loading = false;
      }
    }
  }
})
</script>

<template>

  <v-card max-width="840" class="mx-auto" style="margin-bottom: 50px">
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
            Price: ${{ tx.price_at_purchase }}
            Date: {{ new Date(tx.created_at).toLocaleDateString() }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>