<script setup lang="ts">
import { onMounted } from 'vue';
import { useCryptoWalletStore } from '@/stores/cryptoWalletStore';

const store = useCryptoWalletStore();

onMounted(async () => {
  await store.fetchTransactions();
});
</script>

<template>

  <v-card max-width="840" class="mx-auto" style="border-radius: 5px; box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);">
    <v-card-title>Your Crypto Transactions</v-card-title>

    <v-card-text>
      <v-alert v-if="store.error" type="error" dense>{{ store.error }}</v-alert>

      <v-progress-circular
          v-if="store.loading"
          indeterminate
          color="primary"
      />

      <v-list v-else>
        <v-list-item
            v-for="tx in store.transactions"
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