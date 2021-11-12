import { assign, MachineOptions, spawn } from 'xstate';
import { createEmployee } from '../../../../../models/api/employee';
import { createApiClient } from '../../../../api/utils/apiClient';
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
            apiClient: createApiClient(),
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
            apiClient: createApiClient(),
            employee: createEmployee(),
            errors: undefined
          }),
          'RegisterService'
        )
    }),
    assignForgotRef: assign({
      forgotRef: (context) =>
        spawn(
          ForgotMachine.withContext({
            apiClient: createApiClient(),
            email: undefined,
            errors: undefined
          }),
          'ForgotService'
        )
    }),
    assignToken: assign({
      token: (context, event) => {
        const token = (event as FormValidateEvent).data;
        return token;
      }
    }),
    goToHomePage: ({ history }) => history.push('/home')
  },
  guards: {},
  activities: {},
  delays: {}
};
