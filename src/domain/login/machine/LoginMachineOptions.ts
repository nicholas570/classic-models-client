import { get, isEmpty } from 'lodash';
import { assign, DoneEventObject, sendParent } from 'xstate';
import { FormEvent, FormEvents, FormUpdateEvent } from '../../form/definition/FormEvents';
import { FormMachineOptions } from '../../form/machine/FormMachineOptions';
import { LoginContext, LoginErrors } from '../definition/LoginContext';

const isComplete = (context: LoginContext): boolean => !isEmpty(context.login) && !!(context.password && context.password.length >= 6);

export const LoginOptions: FormMachineOptions<LoginContext> = {
  guards: {
    isFormComplete: isComplete,
    isFormIncomplete: (context: LoginContext) => !isComplete(context),
    isFormValidated: (context: LoginContext, event: DoneEventObject) => event.data === '123',
    shouldBlock: (context: LoginContext, event: DoneEventObject) => false
  },
  services: {
    submitAsync: async (context: LoginContext): Promise<any> => {
      await new Promise((res) => setTimeout(res, 1000));
      const success = context.login === 'mylogin' && context.password === 'mypassword';
      const token = '123';
      if (success) {
        return token;
      }
      return Promise.reject();
    }
  },
  actions: {
    onUpdate: assign((context: LoginContext, event: FormEvents) => {
      const { formData } = event as FormUpdateEvent;
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
      } else if (password.length < 6) {
        errors.password = 'Password is too short :)';
      }
      return {
        ...context,
        errors
      };
    }),
    onBlock: assign((context: LoginContext, event: FormEvents) => context),
    onValidated: sendParent((context, event: DoneEventObject) => {
      return { type: FormEvent.Validate, data: event.data };
    }),
    onFormError: assign({
      errors: (context) => {
        return { invalidCredentials: 'Invalid credentials' };
      }
    })
  },
  activities: {},
  delays: {}
};
