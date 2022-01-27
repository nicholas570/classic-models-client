import { StateSchema } from 'xstate';

export enum AuthStates {
  IDLE = 'IDLE',
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  FORGOT = 'FORGOT',
  AUTHENTICATED = 'AUTHENTICATED'
}

export type AuthSchema = StateSchema<any> & {
  states: {
    [AuthStates.IDLE]: StateSchema<any>;
    [AuthStates.REGISTER]: StateSchema<any>;
    [AuthStates.LOGIN]: StateSchema<any>;
    [AuthStates.FORGOT]: StateSchema<any>;
    [AuthStates.AUTHENTICATED]: StateSchema<any>;
  };
};
