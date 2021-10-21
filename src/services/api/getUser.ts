import { ApiClient } from './utils/apiClient';

export const getUser = async (): Promise<any> => {
  const { data } = await ApiClient.get('/users/2');
  return data;
};
