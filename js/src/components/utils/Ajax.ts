import axios, { AxiosInstance } from 'axios';

export default class Ajax {

    private BASE_DOMAIN: string;
    private BASE_URL: string;
    private CLIENT: AxiosInstance;

    constructor() {
        this.BASE_DOMAIN = window.location.origin;
        this.BASE_URL = this.BASE_DOMAIN + '/api/staff';
        this.CLIENT = axios.create({
            baseURL: this.BASE_URL,
            timeout: 50000,
        });
    }

    get baseUrl() {// for test
        return this.BASE_URL;
    }

    get client() {// for test
        return this.CLIENT;
    }
}
