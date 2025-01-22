<script>
import {useWalletStore} from '@/stores/walletStore';
import HeaderSection from "@/components/HeaderSection.vue";
import HeroBackground from "@/components/layout/HeroBackground.vue";
import Dashboard from "@/components/personalinfo/Dashboard.vue";
import BuyCryptoForm from "@/components/personalinfo/BuyCryptoForm.vue";
import FooterSection from "@/components/FooterSection.vue";
import TransactionWallet from "@/components/personalinfo/TransactionWallet.vue";
import SellCryptoForm from "@/components/personalinfo/SellCryptoForm.vue";

export default {
  name: 'WalletPage',
  components: {SellCryptoForm, TransactionWallet, FooterSection, BuyCryptoForm, Dashboard, HeroBackground, HeaderSection},
  data() {
    return {
      money: 0,
      loading: false,
      error: null,
      amountToAdd: '',
    };
  },

  async created() {
    await this.loadWalletData();
  },

  methods: {
    async loadWalletData() {
      try {
        const walletStore = useWalletStore();
        await walletStore.fetchUserMoney();
        this.money = walletStore.userMoney;
        this.loading = walletStore.loading;
        this.error = walletStore.error;
      } catch (error) {
        console.error('Error loading wallet:', error);
      }
    },

    async handleAddMoney() {
      if (!this.amountToAdd || isNaN(this.amountToAdd)) {
        this.error = 'Please enter a valid amount';
        return;
      }

      try {
        const walletStore = useWalletStore();
        await walletStore.addMoney(Number(this.amountToAdd));
        this.amountToAdd = '';
        await this.loadWalletData();
      } catch (error) {
        console.error('Error adding money:', error);
      }
    },

    async refreshBalance() {
      await this.loadWalletData();
      await this.$refs.transactionWallet.loadTransactions();
    }
  }
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
                  v-if="error"
                  type="error"
                  class="mb-4"
              >
                {{ error }}
              </v-alert>

              <div class="text-center">
                <div v-if="loading" class="my-4">
                  <v-progress-circular
                      indeterminate
                      color="primary"
                  ></v-progress-circular>
                </div>
                <div v-else class="text-h3 font-weight-bold my-4">
                  ${{ money.toFixed(2) }}
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
                    :loading="loading"
                >
                  Add Money
                </v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-btn
                  color="primary"
                  @click="refreshBalance"
                  :loading="loading"
              >
                <v-icon left>mdi-refresh</v-icon>
                Refresh Balance
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <BuyCryptoForm @buy-completed="refreshBalance" />
    </v-container>


    <TransactionWallet ref="transactionWallet"/>

    <SellCryptoForm @sell-completed="refreshBalance"/>

    <div>
      <FooterSection/>
    </div>

  </div>
</template>

<style scoped>

</style>