import { MachineConfig } from 'xstate';
import { FormEvent } from '../../../form/definition/FormEvents';
import { AuthContext } from '../definition/AuthContext';
import { AuthEvent, AuthEvents } from '../definition/AuthEvents';
import { AuthSchema, AuthStates } from '../definition/AuthSchema';

export const AuthMachineConfig: MachineConfig<AuthContext, AuthSchema, AuthEvent> = {
  id: 'auth',
  initial: AuthStates.SignIn,
  states: {
    [AuthStates.Register]: {
      on: {
        [AuthEvents.SignIn]: AuthStates.SignIn,
        [FormEvent.Validate]: AuthStates.SignIn,
        [AuthEvents.Forgot]: AuthStates.Forgot
      }
    },
    [AuthStates.SignIn]: {
      entry: 'assignLoginRef',
      on: {
        [AuthEvents.Register]: {
          target: AuthStates.Register,
          actions: 'assignRegisterRef'
        },
        [AuthEvents.Forgot]: AuthStates.Forgot,
        [FormEvent.Validate]: {
          target: AuthStates.Authenticated,
          actions: 'assignToken'
        }
      }
    },
    [AuthStates.Forgot]: {
      on: {
        [AuthEvents.Register]: AuthStates.Register,
        [AuthEvents.Forgot]: AuthStates.Forgot
      }
    },
    [AuthStates.Authenticated]: {
      type: 'final'
    }
  }
};
