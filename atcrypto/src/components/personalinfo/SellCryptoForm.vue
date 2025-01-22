<script lang="ts">
import { useCryptoStore } from '@/stores/cryptoStore';
import {useWalletStore} from "@/stores/walletStore.ts";
import {type Transaction, useTransactionStore} from "@/stores/transactionStore.ts";

interface Transaction {
  id: number;
  crypto_id: number;
  crypto_name: string;
  amount: number;
  price_at_purchase: number;
}

interface ComponentData {
  selectedTransaction: Transaction | null;
  amount: string;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  transactions: Transaction[];
  currentPrices: Record<number, number>;
}


export default {
  name: 'SellCryptoForm',

  data(): ComponentData {
    return {
      selectedTransaction: null,
      amount: '',
      loading: false,
      error: null,
      successMessage: null,
      transactions: [] as Transaction[],
      currentPrices: {}
    };
  },

  computed: {
    maxAmount(): number {
      if (!this.selectedTransaction) return 0;
      return this.selectedTransaction.amount;
    },

    profit() {
      if (!this.selectedTransaction || !this.amount) return 0;
      const currentPrice = this.currentPrices[this.selectedTransaction.crypto_id] || 0;
      const buyingPrice = this.selectedTransaction.price_at_purchase;
      return (currentPrice - buyingPrice) * Number(this.amount);
    },

    totalValue() {
      if (!this.selectedTransaction || !this.amount) return 0;
      const currentPrice = this.currentPrices[this.selectedTransaction.crypto_id] || 0;
      return currentPrice * Number(this.amount);
    },

    canSell() {
      return this.selectedTransaction &&
          Number(this.amount) > 0 &&
          Number(this.amount) <= this.maxAmount;
    }
  },

  async created() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.loading = true;
        const transactionStore = useTransactionStore();
        const cryptoStore = useCryptoStore();

        await Promise.all([
          transactionStore.fetchTransactions(),
          cryptoStore.fetchCryptos()
        ]);

        this.transactions = transactionStore.transactions;
        const cryptos = cryptoStore.getCryptos;

        this.currentPrices = cryptos.reduce((acc: Record<number, number>, crypto) => {
          if (crypto && crypto.id && crypto.current_price) {
            acc[crypto.id] = crypto.current_price;
          }
          return acc;
        }, {});
      } catch (error) {
        this.error = 'Failed to load transactions';
      } finally {
        this.loading = false;
      }
    },

    async handleSell() {
      if (!this.canSell || !this.selectedTransaction) return;

      try {
        this.loading = true;
        const walletStore = useWalletStore();

        await walletStore.sellCrypto({
          transactionId: this.selectedTransaction.id,
          amount: Number(this.amount),
          currentPrice: this.currentPrices[this.selectedTransaction.crypto_id]
        });

        this.successMessage = `Successfully sold! Profit: $${this.profit.toFixed(2)}`;
        this.amount = '';
        this.selectedTransaction = null;
        await this.loadData();
        this.$emit('sell-completed');
      } catch (error) {
        this.error = 'Failed to sell crypto';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <v-card class="mx-auto" max-width="800" style="border-radius: 5px; box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2); margin-bottom: 50px; margin-top: 20px">
    <v-card-title class="text-h5">Sell Crypto</v-card-title>

    <v-card-text>
      <v-alert
          v-if="error"
          type="error"
          class="mb-4"
      >
        {{ error }}
      </v-alert>

      <v-alert
          v-if="successMessage"
          type="success"
          class="mb-4"
      >
        {{ successMessage }}
      </v-alert>

      <v-select
          v-model="selectedTransaction"
          :items="transactions"
          item-title="crypto_name"
          item-value="id"
          label="Select crypto to sell"
          return-object
          :loading="loading"
          :disabled="loading"
      >
        <template v-slot:item="{ item }">
          <v-list-item-title>
            {{ item.crypto_name }} - Amount: {{ item.amount }}
            (Bought at: ${{ item.price_at_purchase }})
          </v-list-item-title>
        </template>
      </v-select>

      <v-text-field
          v-model="amount"
          label="Amount to sell"
          type="number"
          :rules="[v => !v || v <= maxAmount || 'Exceeds available amount']"
          :hint="selectedTransaction ? `Available: ${maxAmount}` : ''"
          persistent-hint
          :disabled="!selectedTransaction || loading"
      ></v-text-field>

      <v-list class="mt-4" v-if="selectedTransaction && amount">
        <v-list-item>
          <v-list-item-title>Current Price:</v-list-item-title>
          <v-list-item-subtitle class="text-right">
            ${{ currentPrices[selectedTransaction.crypto_id] }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Total Value:</v-list-item-title>
          <v-list-item-subtitle class="text-right">
            ${{ totalValue.toFixed(2) }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Estimated Profit:</v-list-item-title>
          <v-list-item-subtitle :class="profit >= 0 ? 'text-success' : 'text-error'" class="text-right">
            ${{ profit.toFixed(2) }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          :disabled="!canSell"
          :loading="loading"
          @click="handleSell"
      >
        Sell
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.text-success {
  color: #4CAF50;
}
.text-error {
  color: #FF5252;
}
</style>