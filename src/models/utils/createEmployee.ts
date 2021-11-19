import { Employee } from '../api/employee';

export const createNewEmployee = (): Employee => {
  return {
    employeeNumber: undefined,
    lastName: undefined,
    firstName: undefined,
    extension: undefined,
    email: undefined,
    officeCode: undefined,
    jobTitle: undefined,
    password: undefined
  };
};
