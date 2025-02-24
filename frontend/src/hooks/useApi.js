import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3af9-2804-14c-3b96-83d0-81ba-e55b-97b-de4.ngrok-free.app',
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
    }
});

export default api;
