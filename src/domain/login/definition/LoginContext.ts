export type LoginErrors = { login?: string; password?: string };

export type LoginContext = {
  login?: string;
  password?: string;
  errors?: LoginErrors;
};
