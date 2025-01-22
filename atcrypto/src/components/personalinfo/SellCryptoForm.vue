<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCryptoWalletStore } from '@/stores/cryptoWalletStore';
import type { Transaction } from '@/stores/cryptoWalletStore';

const emit = defineEmits<{
  (e: 'sell-completed'): void
}>();

const store = useCryptoWalletStore();
const selectedTransaction = ref<Transaction | null>(null);
const amount = ref('');

const maxAmount = computed(() => {
  if (!selectedTransaction.value) return 0;
  return selectedTransaction.value.amount;
});

const profit = computed(() => {
  if (!selectedTransaction.value || !amount.value) return 0;
  const currentPrice = store.currentPrices[selectedTransaction.value.crypto_id] || 0;
  const buyingPrice = selectedTransaction.value.price_at_purchase;
  return (currentPrice - buyingPrice) * Number(amount.value);
});

const totalValue = computed(() => {
  if (!selectedTransaction.value || !amount.value) return 0;
  const currentPrice = store.currentPrices[selectedTransaction.value.crypto_id] || 0;
  return currentPrice * Number(amount.value);
});

const canSell = computed(() => {
  return selectedTransaction.value &&
      Number(amount.value) > 0 &&
      Number(amount.value) <= maxAmount.value;
});

const handleSell = async () => {
  if (!canSell.value || !selectedTransaction.value) return;

  try {
    await store.sellCrypto({
      transactionId: selectedTransaction.value.id,
      amount: Number(amount.value),
      currentPrice: store.currentPrices[selectedTransaction.value.crypto_id]
    });
    amount.value = '';
    selectedTransaction.value = null;
    emit('sell-completed');
  } catch (error) {
    console.error('Error selling crypto:', error);
  }
};
</script>

<template>
  <v-card class="mx-auto" max-width="800" style="border-radius: 5px; box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2); margin-bottom: 50px; margin-top: 20px">
    <v-card-title class="text-h5">Sell Crypto</v-card-title>

    <v-card-text>
      <v-alert
          v-if="store.error"
          type="error"
          class="mb-4"
      >
        {{ store.error }}
      </v-alert>

      <v-select
          v-model="selectedTransaction"
          :items="store.transactions"
          item-title="crypto_name"
          item-value="id"
          label="Select crypto to sell"
          return-object
          :loading="store.loading"
          :disabled="store.loading"
      >
      </v-select>

      <v-text-field
          v-model="amount"
          label="Amount to sell"
          type="number"
          :rules="[v => !v || v <= maxAmount || 'Exceeds available amount']"
          :hint="selectedTransaction ? `Available: ${maxAmount}` : ''"
          persistent-hint
          :disabled="!selectedTransaction || store.loading"
      ></v-text-field>

      <v-list class="mt-4" v-if="selectedTransaction && amount">
        <v-list-item>
          <v-list-item-title>Current Price:</v-list-item-title>
          <v-list-item-subtitle class="text-right">
            ${{ store.currentPrices[selectedTransaction.crypto_id] }}
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
          :loading="store.loading"
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