import { MachineConfig } from 'xstate';
import { FormEvent } from '../../../form/definition/FormEvents';
import { AuthContext } from '../definition/AuthContext';
import { AuthEvent, AuthEvents } from '../definition/AuthEvents';
import { AuthSchema, AuthStates } from '../definition/AuthSchema';

export const AuthMachineConfig: MachineConfig<AuthContext, AuthSchema, AuthEvent> = {
  id: 'auth',
  initial: AuthStates.Login,
  states: {
    [AuthStates.Login]: {
      entry: 'assignLoginRef',
      on: {
        [AuthEvents.Register]: {
          target: AuthStates.Register
        },
        [AuthEvents.Forgot]: {
          target: AuthStates.Forgot
        },
        [FormEvent.Validate]: {
          target: AuthStates.Authenticated,
          actions: 'assignToken'
        }
      }
    },
    [AuthStates.Register]: {
      entry: 'assignRegisterRef',
      on: {
        [AuthEvents.SignIn]: AuthStates.Login,
        [FormEvent.Validate]: AuthStates.Login
      }
    },
    [AuthStates.Forgot]: {
      entry: 'assignForgotRef',
      on: {
        [AuthEvents.SignIn]: AuthStates.Login,
        [FormEvent.Validate]: AuthStates.Login
      }
    },
    [AuthStates.Authenticated]: {
      type: 'final'
    }
  }
};
