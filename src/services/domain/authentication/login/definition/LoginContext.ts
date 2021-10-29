import { AxiosInstance } from 'axios';

export type LoginErrors = { email?: string; password?: string; invalidCredentials?: string };

export type LoginContext = {
  apiClient: AxiosInstance;
  email?: string;
  password?: string;
  errors?: LoginErrors;
};
