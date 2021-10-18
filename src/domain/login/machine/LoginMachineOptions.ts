import { get, isEmpty } from 'lodash';
import { assign, DoneEventObject } from 'xstate';
import { FormEvents, FormUpdateEvent } from '../../form/definition/FormEvents';
import { FormMachineOptions } from '../../form/machine/FormMachineOptions';
import { LoginContext, LoginErrors } from '../definition/LoginContext';

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
    onUpdate: assign((context: LoginContext, event: FormEvents) => {
      const { formData } = event as FormUpdateEvent;
      console.log(formData);

      return {
        ...context,
        ...formData,
        errors: undefined
      };
    }),
    updateIncomplete: assign((context: LoginContext, event: FormEvents) => {
      const login = get(event, 'formData.login', context.login);
      const password = get(event, 'formData.password', context.password);
      const errors: LoginErrors = {};
      if (isEmpty(login)) {
        errors.login = 'Fill-in your login';
      }
      if (isEmpty(password)) {
        errors.password = 'Fill-in your Password';
      } else if (password.length <= 6) {
        errors.password = 'Password is too short :)';
      }
      return {
        ...context,
        errors
      };
    }),
    onBlock: assign((context: LoginContext, event: FormEvents) => context),
    onValidated: assign((context: LoginContext, event: FormEvents) => context),
    onFormError: assign((context: LoginContext, event: FormEvents) => {
      return {
        ...context,
        invalidMessage: { login: 'Informations incorrectes' }
      };
    })
  },
  activities: {},
  delays: {}
};