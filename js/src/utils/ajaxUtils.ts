import axios, { AxiosInstance } from 'axios';

const BASE_DOMAIN: string = window.location.origin;
export const BASE_URL: string = BASE_DOMAIN + '/api';
export const CLIENT: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
});

