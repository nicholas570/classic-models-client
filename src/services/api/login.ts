import { AxiosInstance } from 'axios';
import { Credentials } from '../../models/auth/Credentials';

export interface AuthResponse {
  isAuthenticated: boolean;
  token?: string;
}

export const login = async (apiClient: AxiosInstance, credentials: Credentials): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/auth', credentials);
  return data as AuthResponse;
};
