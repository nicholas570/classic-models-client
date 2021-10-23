export type ForgotErrors = {
  email?: string;
  invalidCredentials?: string;
};

export interface ForgotContext {
  email?: string;
  errors?: ForgotErrors;
}
