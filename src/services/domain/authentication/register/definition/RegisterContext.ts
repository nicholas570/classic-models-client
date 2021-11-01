import { AxiosInstance } from 'axios';
import { Employee } from '../../../../../models/api/employee';
import { OfficeCode } from '../../../../../models/api/offices';

export type RegisterErrors = {
  employeeNumber?: string;
  lastName?: string;
  firstName?: string;
  extension?: string;
  email?: string;
  officeCode?: string;
  password?: string;
  jobTitle?: string;
  message?: string;
};
export interface RegisterContext {
  apiClient: AxiosInstance;
  employee: Employee;
  offices?: OfficeCode[];
  errors?: RegisterErrors;
}
