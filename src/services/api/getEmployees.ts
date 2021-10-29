import { AxiosInstance } from 'axios';

export const getEmployees = async (apiClient: AxiosInstance): Promise<any> => {
  const { data } = await apiClient.get('/employees');
  return data;
};
