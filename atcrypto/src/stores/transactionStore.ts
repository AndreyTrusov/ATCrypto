export interface Transaction {
    id: number;
    crypto_id: number;
    amount: number;
    price_at_purchase: number;
    created_at: string;
    crypto_name: string;
}

import { defineStore } from 'pinia';
import axios from 'axios';

interface TransactionState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}

export const useTransactionStore = defineStore('transaction', {
    state: (): TransactionState => ({
        transactions: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchTransactions() {
            this.loading = true;
            this.error = null;

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get<Transaction[]>('http://localhost:3000/api/transactions/crypto', {
                    headers: { Authorization: `${token}` }
                });
                this.transactions = response.data;
            } catch (error) {
                this.error = 'Failed to load transactions';
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});