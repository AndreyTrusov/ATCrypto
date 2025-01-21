import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

interface Crypto {
    id: number;
    crypto_name: string;
    market_capitalization: number;
    current_price?: number;
    volume_24h?: number;
}

interface CryptoState {
    cryptos: Crypto[];
}

export const useCryptoStore = defineStore('crypto', {
    state: (): CryptoState => ({
        cryptos: [],
    }),

    getters: {
        getCryptos: (state) => state.cryptos,
    },

    actions: {
        async fetchCryptos() {
            try {
                const response = await axios.get(`${API_URL}/api/cryptos`);
                this.cryptos = response.data;
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    },
});
