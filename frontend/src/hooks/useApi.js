import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:3333',
    baseURL: 'https://0eb5-2804-868-d052-7016-1825-a887-a5e6-bfba.ngrok-free.app',
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
    }
});

export default api;
