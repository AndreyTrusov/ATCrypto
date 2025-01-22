<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCryptoWalletStore } from '@/stores/cryptoWalletStore';

interface Crypto {
  id: number;
  crypto_name: string;
  market_capitalization: number;
  current_price: number;
  volume_24h: number;
}

const emit = defineEmits<{
  (e: 'buy-completed'): void
}>();

const store = useCryptoWalletStore();
const selectedCrypto = ref<Crypto | null>(null);
const amount = ref('');

const maxAmount = computed(() => {
  if (!selectedCrypto.value) return 0;
  return store.userMoney / selectedCrypto.value.current_price;
});

const totalCost = computed(() => {
  if (!selectedCrypto.value || !amount.value) return 0;
  return Number(amount.value) * selectedCrypto.value.current_price;
});

const canBuy = computed(() => {
  return totalCost.value <= store.userMoney && Number(amount.value) > 0;
});

const handleBuy = async () => {
  if (!canBuy.value || !selectedCrypto.value) return;

  try {
    await store.buyCrypto({
      cryptoId: selectedCrypto.value.id,
      amount: Number(amount.value),
      totalCost: totalCost.value
    });
    amount.value = '';
    selectedCrypto.value = null;
    emit('buy-completed');
  } catch (error) {
    console.error('Error buying crypto:', error);
  }
};
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="11" sm="11" md="11">
      <v-card style="border-radius: 5px; box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);">
        <v-card-title class="text-center text-h5 py-4">
          Buy Cryptocurrency
        </v-card-title>

        <v-card-text>
          <v-alert
              v-if="store.error"
              type="error"
              class="mb-4"
          >
            {{ store.error }}
          </v-alert>

          <v-select
              v-model="selectedCrypto"
              :items="store.cryptos"
              item-title="crypto_name"
              item-value="id"
              label="Select Cryptocurrency"
              return-object
              class="mb-4"
          ></v-select>

          <v-text-field
              v-model="amount"
              type="number"
              label="Amount to Buy"
              :disabled="!selectedCrypto"
              :max="maxAmount"
              :rules="[v => !v || v <= maxAmount || 'Insufficient funds']"
              class="mb-4"
          ></v-text-field>

          <div v-if="selectedCrypto" class="text-center text-h6 font-weight-bold mb-4">
            Total Cost: ${{ totalCost.toFixed(2) }}
          </div>
        </v-card-text>

        <v-card-actions class="justify-center pb-4">
          <v-btn
              block
              color="primary"
              :disabled="!canBuy"
              :loading="store.loading"
              @click="handleBuy"
          >
            Buy Crypto
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

</template>

<style scoped>

</style>