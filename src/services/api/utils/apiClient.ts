import axios, { AxiosInstance } from 'axios';

const getServerUrl = () =>
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
    ? process.env.REACT_APP_SERVER_URL
    : process.env.REACT_APP_DEV_SERVER_URL;

export const createApiClient = (token?: string): AxiosInstance => {
  return axios.create({
    baseURL: getServerUrl(),
    headers: { Authorization: `Bearer ${token}` }
  });
};
