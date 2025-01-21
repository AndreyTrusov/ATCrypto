import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const message = error.response.data.message || 'An error occurred';
            return Promise.reject(new Error(message));
        } else if (error.request) {
            return Promise.reject(new Error('No response from server'));
        } else {
            return Promise.reject(new Error('Request configuration error'));
        }
    }
);

export default instance;
