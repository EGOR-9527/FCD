import axios from 'axios';

export const API_URL = 'http://localhost:5000/api/todos/';

export const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})