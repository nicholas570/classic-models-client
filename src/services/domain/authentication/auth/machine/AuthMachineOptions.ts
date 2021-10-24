import { assign, DoneEventObject, MachineOptions, spawn } from 'xstate';
import { getUser } from '../../../../api/getUser';
import { FormValidateEvent } from '../../../form/definition/FormEvents';
import { ForgotMachine } from '../../forgot/machine/ForgotMachine';
import { LoginMachine } from '../../login/machine/LoginMachine';
import { RegisterMachine } from '../../register/machine/RegisterMachine';
import { AuthContext } from '../definition/AuthContext';
import { AuthEvent } from '../definition/AuthEvents';

export const AuthMachineOptions: MachineOptions<AuthContext, AuthEvent> = {
  services: {},
  actions: {
    assignLoginRef: assign({
      loginRef: (context) =>
        spawn(
          LoginMachine.withContext({
            email: undefined,
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
    assignForgotRef: assign({
      registerRef: (context) =>
        spawn(
          ForgotMachine.withContext({
            email: undefined,
            errors: undefined
          }),
          'ForgotService'
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
  activities: {},
  delays: {}
};
