import axios, { AxiosInstance } from 'axios';

export const ApiClient: AxiosInstance = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/' });
