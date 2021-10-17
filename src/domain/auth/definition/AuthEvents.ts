export enum AuthEvents {
  Validate = 'validate',
  UpdateForm = 'update',
  Register = 'register',
  SignIn = 'signIn',
  Forgot = 'forgot'
}

export type AuthEvent =
  | { type: AuthEvents.Validate }
  | { type: AuthEvents.Register }
  | { type: AuthEvents.SignIn }
  | { type: AuthEvents.Forgot };
