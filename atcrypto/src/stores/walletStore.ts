import {defineStore} from "pinia";
import axios from 'axios';

interface WalletState {
    config: {
        apiUrl: string;
    };
    userMoney: number;
    loading: boolean;
    error: string | null;
}

interface BuyCryptoParams {
    cryptoId: number;
    amount: number;
    totalCost: number;
}

export const useWalletStore = defineStore('wallet', {
    state: (): WalletState => ({
        config: {
            apiUrl: 'http://localhost:3000/api'
        },
        userMoney: 0,
        loading: false,
        error: null
    }),

    actions: {
        async buyCrypto(params: BuyCryptoParams) {
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                await axios.post(
                    `${this.config.apiUrl}/transactions/buy-crypto`,
                    params,
                    { headers: { Authorization: `${token}` } }
                );
                await this.fetchUserMoney();
            } catch (error) {
                this.error = 'Failed to buy crypto';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async sellCrypto({ transactionId, amount, currentPrice }: { transactionId: number; amount: number; currentPrice: number }) {
            try {
                const token = localStorage.getItem('token');
                await axios.post(`${this.config.apiUrl}/transactions/sell`, {
                    transactionId,
                    amount,
                    currentPrice
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Error selling crypto:', error);
                throw error;
            }
        },

        async fetchUserMoney() {
            this.loading = true;
            this.error = null;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${this.config.apiUrl}/users/money`, {
                    headers: { Authorization: `${token}` }
                });
                this.userMoney = response.data[0]?.money || 0;
            } catch (error) {
                this.error = 'Failed to fetch wallet balance';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async addMoney(amount: number) {
            this.loading = true;
            this.error = null;
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
        }
    }
});