import { AxiosInstance } from 'axios';
import { AuthResponse, ResponseContent } from '../../models/api/response';
import { Credentials } from '../../models/auth/Credentials';

export const loginAsync = async (apiClient: AxiosInstance, credentials: Credentials): Promise<ResponseContent<AuthResponse>> => {
  const { data } = await apiClient.post<ResponseContent<AuthResponse>>('/auth', credentials);
  return data;
};
