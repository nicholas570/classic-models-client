import axios, { AxiosInstance } from 'axios';

export const createApiClient = (token?: string): AxiosInstance => {
  return axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: { Authorization: `Bearer ${token}` }
  });
};
