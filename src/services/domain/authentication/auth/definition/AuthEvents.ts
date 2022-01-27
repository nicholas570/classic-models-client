import { FormValidateEvent } from '../../../form/definition/FormEvents';

export enum AuthEvents {
  REGISTER = 'REGISTER',
  SIGN_IN = 'SIGN_IN',
  FORGOT = 'FORGOT'
}

export type AuthEvent = { type: AuthEvents.REGISTER } | { type: AuthEvents.SIGN_IN } | { type: AuthEvents.FORGOT } | FormValidateEvent;
