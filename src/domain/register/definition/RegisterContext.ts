export type RegisterErrors = { firstName?: string; lastName?: string; email?: string; password?: string };

export interface RegisterContext {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  errors?: RegisterErrors;
}
