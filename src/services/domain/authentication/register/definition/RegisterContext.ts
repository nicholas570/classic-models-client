import { AxiosInstance } from 'axios';

export type RegisterErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  invalidCredentials?: string;
};

export interface RegisterContext {
  apiClient: AxiosInstance;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  errors?: RegisterErrors;
}
