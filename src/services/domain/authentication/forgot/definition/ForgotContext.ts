import { AxiosInstance } from 'axios';

export type ForgotErrors = {
  email?: string;
  invalidCredentials?: string;
};

export interface ForgotContext {
  apiClient: AxiosInstance;
  email?: string;
  errors?: ForgotErrors;
}
