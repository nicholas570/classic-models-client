import { get, isEmpty } from 'lodash';
import { assign, DoneEventObject } from 'xstate';
import { FormEvents } from '../../form/definition/FormEvents';
import { FormMachineOptions } from '../../form/machine/FormMachineOptions';
import { LoginContext } from '../definition/LoginContext';

const isComplete = (context: LoginContext): boolean => !isEmpty(context.login) && !!(context.password && context.password.length > 6);

export const LoginOptions: FormMachineOptions<LoginContext> = {
  guards: {
    isFormComplete: isComplete,
    isFormIncomplete: (context: LoginContext) => !isComplete(context),
    isFormValidated: (context: LoginContext, event: DoneEventObject) => event.data === true,
    shouldBlock: (context: LoginContext, event: DoneEventObject) => false
  },
  services: {
    submitAsync: async (context: LoginContext): Promise<any> => {
      await new Promise((res) => setTimeout(res, 2000));
      const serverError = false;
      if (serverError) return Promise.reject();
      const success = context.login === 'mylogin' && context.password === 'mypassword';
      return Promise.resolve(success);
    }
  },
  actions: {
    updateIncomplete: assign((context: LoginContext, event: FormEvents) => {
      const login = get(event, 'formData.login', context.login);
      const password = get(event, 'formData.password', context.password);
      const updated: LoginContext = {};
      if (isEmpty(login) || isEmpty(password)) {
        updated.invalidMessage = 'Fill-in your login/password';
      } else if (password.length <= 6) {
        updated.invalidMessage = 'Password is too short :)';
      }
      return {
        ...context,
        ...updated
      };
    }),
    onBlock: assign((context: LoginContext, event: FormEvents) => context),
    onValidated: assign((context: LoginContext, event: FormEvents) => context),
    onFormError: assign((context: LoginContext, event: FormEvents) => {
      return {
        ...context,
        invalidMessage: 'Informations incorrectes'
      };
    }),
    onUpdate: assign((context: LoginContext, event: FormEvents) => {
      return {
        ...context,
        invalidMessage: undefined,
        ...get(event, 'formData')
      };
    })
  },
  activities: {},
  delays: {}
};
