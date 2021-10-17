import { MachineConfig } from 'xstate';
import { AuthEvent, AuthEvents } from '../definition/AuthEvents';
import { AuthSchema, AuthStates } from '../definition/AuthSchema';

export const AuthMachineConfig: MachineConfig<void, AuthSchema, AuthEvent> = {
  id: 'auth',
  initial: AuthStates.SignIn,
  states: {
    [AuthStates.Register]: {
      on: {
        [AuthEvents.SignIn]: AuthStates.SignIn,
        [AuthEvents.Forgot]: AuthStates.Forgot
      }
    },
    [AuthStates.SignIn]: {
      on: {
        [AuthEvents.Register]: AuthStates.Register,
        [AuthEvents.Forgot]: AuthStates.Forgot
      }
    },
    [AuthStates.Forgot]: {
      on: {
        [AuthEvents.Register]: AuthStates.Register,
        [AuthEvents.Forgot]: AuthStates.Forgot
      }
    },
    [AuthStates.Authenticated]: {
      // type: "final"
    }
  }
};
