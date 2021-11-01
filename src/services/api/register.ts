import { AxiosInstance } from 'axios';
import { Employee } from '../../models/api/employee';
import { ResponseContent } from '../../models/api/response';

export const registerAsync = async (apiClient: AxiosInstance, employee: Employee): Promise<ResponseContent<Employee>> => {
  const { data } = await apiClient.post<ResponseContent<Employee>>('/employees', employee);
  return data;
};
