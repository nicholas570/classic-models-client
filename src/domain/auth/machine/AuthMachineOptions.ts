import { assign, MachineOptions, spawn } from 'xstate';
import { FormValidateEvent } from '../../form/definition/FormEvents';
import { LoginMachine } from '../../login/machine/LoginMachine';
import { RegisterMachine } from '../../register/machine/RegisterMachine';
import { AuthContext } from '../definition/AuthContext';
import { AuthEvent } from '../definition/AuthEvents';

export const AuthMachineOptions: MachineOptions<AuthContext, AuthEvent> = {
  actions: {
    assignLoginRef: assign({
      loginRef: (context) =>
        spawn(
          LoginMachine.withContext({
            login: undefined,
            password: undefined,
            errors: undefined
          }),
          'LoginService'
        )
    }),
    assignRegisterRef: assign({
      registerRef: (context) =>
        spawn(
          RegisterMachine.withContext({
            firstName: undefined,
            lastName: undefined,
            password: undefined,
            email: undefined,
            errors: undefined
          }),
          'RegisterService'
        )
    }),
    assignToken: assign({
      token: (context, event) => {
        const d = (event as FormValidateEvent).data;
        return d;
      }
    })
  },
  guards: {},
  services: {},
  activities: {},
  delays: {}
};