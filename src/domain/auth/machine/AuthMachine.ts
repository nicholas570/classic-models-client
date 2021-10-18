import { Machine, State } from 'xstate';
import { AuthEvent } from '../definition/AuthEvents';
import { AuthSchema } from '../definition/AuthSchema';
import { AuthMachineConfig } from './AuthMachineConfig';

export type AuthState = State<
  void,
  AuthEvent,
  any,
  {
    value: any;
    context: void;
  }
>;

export const AuthMachine = Machine<void, AuthSchema, AuthEvent>(AuthMachineConfig);
