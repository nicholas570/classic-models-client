import { StateSchema } from 'xstate';

export enum AuthStates {
  Register = 'register',
  Login = 'login',
  Forgot = 'forgot',
  Authenticated = 'authenticated'
}

export type AuthSchema = StateSchema<any> & {
  states: {
    [AuthStates.Register]: StateSchema<any>;
    [AuthStates.Login]: StateSchema<any>;
    [AuthStates.Forgot]: StateSchema<any>;
    [AuthStates.Authenticated]: StateSchema<any>;
  };
};
