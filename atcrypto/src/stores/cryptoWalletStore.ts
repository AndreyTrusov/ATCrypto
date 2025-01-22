import { defineStore } from 'pinia';
import axios from 'axios';

interface Crypto {
    id: number;
    crypto_name: string;
    market_capitalization: number;
    current_price: number;
    volume_24h: number;
}

export interface Transaction {
    id: number;
    crypto_id: number;
    amount: number;
    price_at_purchase: number;
    created_at: string;
    crypto_name: string;
}

interface State {
    config: {
        apiUrl: string;
    };
    userMoney: number;
    loading: boolean;
    error: string | null;
    transactions: Transaction[];
    cryptos: Crypto[];
    currentPrices: Record<number, number>;
}


export const useCryptoWalletStore = defineStore('cryptoWallet', {
    state: (): State => ({
        config: {
            apiUrl: 'http://localhost:3000/api'
        },
        userMoney: 0,
        loading: false,
        error: null,
        transactions: [],
        cryptos: [],
        currentPrices: {}
    }),

    getters: {
        getCryptos: (state) => state.cryptos,
        getTransactions: (state) => state.transactions,
        getCurrentPrices: (state) => state.currentPrices
    },

    actions: {
        async fetchAllData() {
            this.loading = true;
            try {
                await Promise.all([
                    this.fetchUserMoney(),
                    this.fetchCryptos(),
                    this.fetchTransactions()
                ]);
            } catch (error) {
                this.error = 'Failed to fetch data';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchUserMoney() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${this.config.apiUrl}/users/money`, {
                    headers: { Authorization: `${token}` }
                });
                this.userMoney = response.data[0]?.money || 0;
            } catch (error) {
                this.error = 'Failed to fetch wallet balance';
                throw error;
            }
        },

        async fetchCryptos() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${this.config.apiUrl}/cryptos`, {
                    headers: { Authorization: `${token}` }
                });
                this.cryptos = response.data;
                this.updateCurrentPrices();
            } catch (error) {
                this.error = 'Failed to fetch cryptos';
                throw error;
            }
        },

        async fetchTransactions() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get<Transaction[]>(`${this.config.apiUrl}/transactions/crypto`, {
                    headers: { Authorization: `${token}` }
                });
                this.transactions = response.data;
            } catch (error) {
                this.error = 'Failed to load transactions';
                throw error;
            }
        },

        updateCurrentPrices() {
            this.currentPrices = this.cryptos.reduce((acc, crypto) => {
                if (crypto && crypto.id && crypto.current_price) {
                    acc[crypto.id] = crypto.current_price;
                }
                return acc;
            }, {} as Record<number, number>);
        },

        async addMoney(amount: number) {
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(
                    `${this.config.apiUrl}/users/money/add`,
                    { amount },
                    { headers: { Authorization: `${token}` } }
                );
                this.userMoney = response.data.money;
            } catch (error) {
                this.error = 'Failed to add money';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async buyCrypto({ cryptoId, amount, totalCost }: { cryptoId: number; amount: number; totalCost: number }) {
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                await axios.post(
                    `${this.config.apiUrl}/transactions/buy-crypto`,
                    { cryptoId, amount, totalCost },
                    { headers: { Authorization: `${token}` } }
                );
                await this.fetchAllData();
            } catch (error) {
                this.error = 'Failed to buy crypto';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async sellCrypto({ transactionId, amount, currentPrice }: { transactionId: number; amount: number; currentPrice: number }) {
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                await axios.post(
                    `${this.config.apiUrl}/transactions/sell`,
                    { transactionId, amount, currentPrice },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                await this.fetchAllData();
            } catch (error) {
                this.error = 'Failed to sell crypto';
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});