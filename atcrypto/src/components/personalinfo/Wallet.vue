<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCryptoWalletStore } from '@/stores/cryptoWalletStore';
import HeaderSection from "@/components/HeaderSection.vue";
import HeroBackground from "@/components/layout/HeroBackground.vue";
import BuyCryptoForm from "@/components/personalinfo/BuyCryptoForm.vue";
import FooterSection from "@/components/FooterSection.vue";
import TransactionWallet from "@/components/personalinfo/TransactionWallet.vue";
import SellCryptoForm from "@/components/personalinfo/SellCryptoForm.vue";

const store = useCryptoWalletStore();
const amountToAdd = ref('');

onMounted(async () => {
  await store.fetchAllData();
});

const handleAddMoney = async () => {
  if (!amountToAdd.value || isNaN(Number(amountToAdd.value))) {
    store.error = 'Please enter a valid amount';
    return;
  }

  try {
    await store.addMoney(Number(amountToAdd.value));
    amountToAdd.value = '';
  } catch (error) {
    console.error('Error adding money:', error);
  }
};

const refreshData = async () => {
  await store.fetchAllData();
};
</script>

<template>
  <div class="sub_page" style="background-color: lightgray">
    <div class="hero_area" style="margin-bottom: 100px;">
      <HeroBackground/>
      <HeaderSection/>
    </div>
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="11" sm="11" md="11">
          <v-card style="border-radius: 5px; box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);">
            <v-card-title class="text-center text-h5 py-4">
              Your Wallet Balance
            </v-card-title>

            <v-card-text>
              <v-alert
                  v-if="store.error"
                  type="error"
                  class="mb-4"
              >
                {{ store.error }}
              </v-alert>

              <div class="text-center">
                <div v-if="store.loading" class="my-4">
                  <v-progress-circular
                      indeterminate
                      color="primary"
                  ></v-progress-circular>
                </div>
                <div v-else class="text-h3 font-weight-bold my-4">
                  ${{ store.userMoney.toFixed(2) }}
                </div>
              </div>
            </v-card-text>

            <v-card-text>
              <v-form @submit.prevent="handleAddMoney">
                <v-text-field
                    v-model="amountToAdd"
                    label="Amount to Add"
                    type="number"
                    prefix="$"
                    min="0"
                    step="0.01"
                ></v-text-field>
                <v-btn
                    color="success"
                    block
                    type="submit"
                    :loading="store.loading"
                >
                  Add Money
                </v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-btn
                  color="primary"
                  @click="refreshData"
                  :loading="store.loading"
              >
                <v-icon left>mdi-refresh</v-icon>
                Refresh Balance
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <BuyCryptoForm @buy-completed="refreshData" />
    </v-container>


    <TransactionWallet ref="transactionWallet"/>

    <SellCryptoForm @sell-completed="refreshData"/>

    <div>
      <FooterSection/>
    </div>

  </div>
</template>

<style scoped>

</style>