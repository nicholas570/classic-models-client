import { StateSchema } from 'xstate';

export enum AuthStates {
  Idle = 'idle',
  Register = 'register',
  Login = 'login',
  Forgot = 'forgot',
  Authenticated = 'authenticated'
}

export type AuthSchema = StateSchema<any> & {
  states: {
    [AuthStates.Idle]: StateSchema<any>;
    [AuthStates.Register]: StateSchema<any>;
    [AuthStates.Login]: StateSchema<any>;
    [AuthStates.Forgot]: StateSchema<any>;
    [AuthStates.Authenticated]: StateSchema<any>;
  };
};
