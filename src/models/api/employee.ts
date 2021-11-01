export interface Employee {
  employeeNumber?: number;
  lastName?: string;
  firstName?: string;
  extension?: string;
  email?: string;
  officeCode?: string;
  jobTitle?: string;
  password?: string;
}

export const createEmployee = () => {
  return {
    lastName: undefined,
    firstName: undefined,
    extension: undefined,
    email: undefined,
    officeCode: undefined,
    jobTitle: undefined,
    password: undefined
  };
};
