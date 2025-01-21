<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useCryptoStore} from "@/stores/cryptoStore.ts";

export default defineComponent({
  name: "Wallet",
  setup(){
    const cryptoStore = useCryptoStore();
    const amount = ref(0);
    const balance = ref(0);
    const selectedCrypto = ref<string | null>(null);
    const cryptos = ref<Crypto[]>([]);
    const purchases = ref<Purchase[]>([]);

    const fetchCryptos = async () => {
      try {
        await cryptoStore.fetchCryptos();
        cryptos.value = cryptoStore.getCryptos;
      } catch (error) {
        console.error('Error fetching cryptos:', error);
      }
    };

    const addMoney = () => {
      if (amount.value <= 0) {
        // Consider adding error message to user
        return;
      }
      balance.value += amount.value;
      console.log(`Added ${amount.value} to wallet. New balance: ${balance.value}`);
      amount.value = 0; // Reset input
    };

    const buyCrypto = async () => {
      try {
        if (!selectedCrypto.value) {
          return;
        }

        const crypto = cryptos.value.find(c => c.symbol === selectedCrypto.value);
        if (!crypto) {
          throw new Error('Selected cryptocurrency not found');
        }

        const cryptoPrice = Math.random() * 1000; // Replace with actual price fetch

        // Check if user has enough balance
        if (balance.value < cryptoPrice) {
          throw new Error('Insufficient balance');
        }

        // Deduct from balance
        balance.value -= cryptoPrice;

        purchases.value.push({
          cryptoName: crypto.name,
          price: cryptoPrice.toFixed(2),
        });

        console.log(`Bought ${crypto.name} for $${cryptoPrice}`);
        selectedCrypto.value = null; // Reset selection
      } catch (error) {
        console.error('Error buying crypto:', error);
        // Consider adding error message to user
      }
    };

    // Fetch cryptos on component mount
    fetchCryptos();

    return {
      amount,
      balance,
      selectedCrypto,
      cryptos,
      purchases,
      addMoney,
      buyCrypto
    };
  },
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>Your Wallet</v-card-title>
          <v-card-text>
            <!-- Display balance -->
            <div class="mb-4">
              Current Balance: ${{ balance.toFixed(2) }}
            </div>

            <v-row>
              <v-col>
                <v-text-field
                    v-model.number="amount"
                    label="Amount to Add"
                    type="number"
                    hint="Enter amount"
                    :rules="[v => v >= 0 || 'Amount must be positive']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
                @click="addMoney"
                color="primary"
                :disabled="amount <= 0"
            >
              Add Money
            </v-btn>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col>
                <v-select
                    v-model="selectedCrypto"
                    :items="cryptos"
                    item-text="name"
                    item-value="symbol"
                    label="Select Cryptocurrency"
                    :rules="[v => !!v || 'Please select a cryptocurrency']"
                ></v-select>
              </v-col>
            </v-row>
            <v-btn
                @click="buyCrypto"
                color="success"
                :disabled="!selectedCrypto || balance <= 0"
            >
              Buy Crypto
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Your Purchases</v-card-title>
          <v-card-text>
            <v-list>
              <template v-if="purchases.length > 0">
                <v-list-item v-for="(purchase, index) in purchases" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ purchase.cryptoName }} - ${{ purchase.price }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Purchased</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list-item v-else>
                <v-list-item-content>No purchases yet</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>