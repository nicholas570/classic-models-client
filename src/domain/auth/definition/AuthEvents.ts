import { FormValidateEvent } from '../../form/definition/FormEvents';

export enum AuthEvents {
  Register = 'register',
  SignIn = 'signIn',
  Forgot = 'forgot'
}

export type AuthEvent = { type: AuthEvents.Register } | { type: AuthEvents.SignIn } | { type: AuthEvents.Forgot } | FormValidateEvent;
