export type LoginErrors = { email?: string; password?: string; invalidCredentials?: string };

export type LoginContext = {
  email?: string;
  password?: string;
  errors?: LoginErrors;
};
