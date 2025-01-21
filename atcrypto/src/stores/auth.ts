import {defineStore} from "pinia";
import axios from 'axios';

interface User {
    id: number;
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
}

const API_URL = 'http://localhost:3000'

export const useAuthStore = defineStore('auth', {

        state: (): AuthState => ({
            user: null,
            token: localStorage.getItem('token') || null,
        }),

        getters: {
            isAuthenticated: (state): boolean => !!state.token,
        },

        actions: {
            async logout() {
                this.token = null;
                this.user = null;
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
            },

            async register(username: string, email: string, password_hash: string): Promise<void> {
                try {
                    const response = await axios.post(`${API_URL}/auth/register`, {
                        username,
                        email,
                        password_hash
                    });

                    this.token = response.data.token;
                    this.user = response.data.user;
                    localStorage.setItem('token', <string>this?.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                } catch (error) {
                    throw error;
                }
            },

            async getFeedbacks() {
                try {
                    const response = await axios.get(`${API_URL}/api/feedbacks`);
                    return response.data;
                } catch (error) {
                    throw error;
                }
            },

            async login(email: string, password_hash: string): Promise<void> {
                try {
                    const response = await axios.post(`${API_URL}/auth/login`, {
                        email,
                        password_hash
                    });

                    this.token = response.data.token;
                    this.user = response.data.user;
                    localStorage.setItem('token', <string>this?.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                } catch (error) {
                    throw error;
                }
            },
        },
    }
);