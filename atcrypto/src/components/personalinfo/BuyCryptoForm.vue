<script lang="ts">
import { useWalletStore } from '@/stores/walletStore';
import { useCryptoStore } from '@/stores/cryptoStore';

interface Crypto {
  id: number;
  crypto_name: string;
  market_capitalization: number;
  current_price: number;
  volume_24h: number;
}

interface CryptoState {
  cryptos: Crypto[];
}


export default {
  name: 'BuyCryptoForm',
  data() {
    return {
      selectedCrypto: null as Crypto | null,
      amount: '' as string | number,
      loading: false,
      error: null as string | null,
      walletBalance: 0,
      cryptoList: [] as Crypto[],
    };
  },

  computed: {
    maxAmount() {
      if (!this.selectedCrypto) return 0;
      return this.walletBalance / this.selectedCrypto.current_price;
    },
    totalCost(): number {
      if (!this.selectedCrypto || !this.amount) return 0;
      return Number(this.amount) * this.selectedCrypto.current_price;
    },
    canBuy(): boolean {
      return this.totalCost <= this.walletBalance && Number(this.amount) > 0;
    }
  },

  async created() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.loading = true;
        const walletStore = useWalletStore();
        const cryptoStore = useCryptoStore();

        await Promise.all([
          walletStore.fetchUserMoney(),
          cryptoStore.fetchCryptos()
        ]);

        this.walletBalance = walletStore.userMoney;
        this.cryptoList = cryptoStore.getCryptos as Crypto[];
      } catch (error) {
        this.error = 'Failed to load data';
      } finally {
        this.loading = false;
      }
    },

    async handleBuy() {
      if (!this.canBuy || !this.selectedCrypto) return;

      try {
        this.loading = true;
        const walletStore = useWalletStore();
        await walletStore.buyCrypto({
          cryptoId: this.selectedCrypto.id,
          amount: Number(this.amount),
          totalCost: this.totalCost
        });

        this.amount = '';
        this.selectedCrypto = null;
        await this.loadData();
      } catch (error) {
        this.error = 'Failed to buy crypto';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center text-h5 py-4">
            Buy Cryptocurrency
          </v-card-title>

          <v-card-text>
            <v-alert
                v-if="error"
                type="error"
                class="mb-4"
            >
              {{ error }}
            </v-alert>

            <v-select
                v-model="selectedCrypto"
                :items="cryptoList"
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
                :loading="loading"
                @click="handleBuy"
            >
              Buy Crypto
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped>

</style>