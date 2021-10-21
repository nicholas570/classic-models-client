import { StateSchema } from 'xstate';

export enum AuthStates {
  Register = 'register',
  SignIn = 'signIn',
  Forgot = 'forgot',
  Authenticated = 'authenticated'
}

export type AuthSchema = StateSchema<any> & {
  states: {
    [AuthStates.Register]: StateSchema<any>;
    [AuthStates.SignIn]: StateSchema<any>;
    [AuthStates.Forgot]: StateSchema<any>;
    [AuthStates.Authenticated]: StateSchema<any>;
  };
};
