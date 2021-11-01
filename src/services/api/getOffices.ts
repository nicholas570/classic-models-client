import { AxiosInstance } from 'axios';
import { Office } from '../../models/api/offices';
import { ResponseContent } from '../../models/api/response';

export const getOfficesAsync = async (apiClient: AxiosInstance): Promise<ResponseContent<Office[]>> => {
  const { data } = await apiClient.get<ResponseContent<Office[]>>('/offices');
  return data;
};
