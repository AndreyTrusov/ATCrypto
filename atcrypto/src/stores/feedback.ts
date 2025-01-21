import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:3000'

interface Feedback {
    id: number;
    name: string;
    position: string;
    image: string;
    quote: string;
}

interface FeedbackState {
    feedbacks: Feedback[];
}

export const useFeedbackStore = defineStore('feedback', {
    state: (): FeedbackState => ({
        feedbacks: [],
    }),

    getters: {
        getFeedbacks: (state) => state.feedbacks,
    },

    actions: {
        async fetchFeedbacks() {
            try {
                const response = await axios.get(`${API_URL}/api/feedbacks`);
                this.feedbacks = response.data;
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        async addFeedback(feedback: Omit<Feedback, 'id' | 'created_at' | 'updated_at'>) {
            try {
                const response = await axios.post(`${API_URL}/api/feedbacks`, feedback);
                this.feedbacks.push(response.data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    }
});
