export type LoginErrors = { login?: string; password?: string; invalidCredentials?: string };

export type LoginContext = {
  login?: string;
  password?: string;
  errors?: LoginErrors;
};
