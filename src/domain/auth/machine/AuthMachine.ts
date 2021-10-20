import { Machine, State } from 'xstate';
import { AuthContext } from '../definition/AuthContext';
import { AuthEvent } from '../definition/AuthEvents';
import { AuthSchema, AuthStates } from '../definition/AuthSchema';
import { AuthMachineConfig } from './AuthMachineConfig';
import { AuthMachineOptions } from './AuthMachineOptions';

export type AuthState = State<
  AuthContext,
  AuthEvent,
  AuthSchema,
  {
    value: AuthStates;
    context: AuthContext;
  }
>;

export const AuthMachine = Machine<AuthContext, AuthSchema, AuthEvent>(AuthMachineConfig, AuthMachineOptions);
