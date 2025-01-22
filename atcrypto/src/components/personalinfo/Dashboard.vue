<script>
import {useCryptoStore} from '@/stores/cryptoStore';
import HeaderSection from "@/components/HeaderSection.vue";
import HeroBackground from "@/components/layout/HeroBackground.vue";
import FooterSection from "@/components/FooterSection.vue";

export default {
  name: 'Dashboard',
  components: {
    FooterSection,
    HeroBackground,
    HeaderSection
  },
  data() {
    return {
      cryptos: [],
      previousPrices: new Map(),
      search: '',
      refreshInterval: null,
      headers: [
        {title: 'Cryptocurrency Name', key: 'crypto_name'},
        {title: 'Capitalization', key: 'market_capitalization'},
        {
          title: 'Price (USD)',
          key: 'current_price',
          align: 'end',
        },
        {title: '24h Change', key: 'volume_24h'},
      ],
    };
  },
  created() {
    this.fetchCryptos();
    this.startAutoRefresh();
  },
  unmounted() {
    this.stopAutoRefresh();
  },
  methods: {
    async fetchCryptos() {
      try {
        const cryptoStore = useCryptoStore();
        await cryptoStore.fetchCryptos();
        const newCryptos = cryptoStore.getCryptos;

        this.cryptos.forEach(crypto => {
          this.previousPrices.set(crypto.crypto_name, crypto.current_price);
        });

        this.cryptos = newCryptos;
      } catch (error) {
        console.error('Error fetching cryptos:', error);
      }
    },
    startAutoRefresh() {
      this.refreshInterval = setInterval(this.fetchCryptos, 10000);
    },
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
      }
    },
    getPriceColor(item) {
      const previousPrice = this.previousPrices.get(item.crypto_name);
      if (!previousPrice) return '';
      return item.current_price > previousPrice ? 'text-green-500' :
          item.current_price < previousPrice ? 'text-red-500' : '';
    }
  },
};
</script>


<template>
  <div class="sub_page" style="background-color: lightgray">
    <div class="hero_area" style="margin-bottom: 100px;">
      <HeroBackground/>
      <HeaderSection/>
    </div>
    <div style="background-color: white; margin: 80px; border-radius: 5px; box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);">
      <v-card title="Cryptocurrency Name" flat>
        <template v-slot:text>
          <div class="d-flex align-center gap-4">
            <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line
                class="flex-grow-1"
            ></v-text-field>
            <v-btn
                color="primary"
                @click="fetchCryptos"
                rounded="lg" size="x-large"
                style="margin: 10px;"
            >Update
            </v-btn>
          </div>
        </template>
      </v-card>

      <v-container>
        <v-data-table
            v-if="cryptos.length"
            :headers="headers"
            :items="cryptos"
            :search="search"
            loading-text="Loading... Please wait"
        >
          <template v-slot:item.current_price="{ item }">
            <span :class="getPriceColor(item)">
              {{ item.current_price }}
            </span>
          </template>
        </v-data-table>
      </v-container>
    </div>

    <div>
      <FooterSection/>
    </div>
  </div>
</template>

<style scoped>
.text-red-500 {
  color: #ef4444;
}

.text-green-500 {
  color: #22c55e;
}
</style>