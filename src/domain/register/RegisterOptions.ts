import { get, isEmpty } from 'lodash';
import { assign, DoneEventObject } from 'xstate';
import { FormEvents } from '../form/definition/FormEvents';
import { FormMachineOptions } from '../form/FormMachineOptions';
import { RegisterContext } from './definition/RegisterContext';

export const RegisterOptions: FormMachineOptions<RegisterContext> = {
  guards: {
    isFormComplete: (context: RegisterContext) =>
      !isEmpty(context.login) && !isEmpty(context.password),
    isFormIncomplete: (context: RegisterContext) =>
      isEmpty(context.login) || isEmpty(context.password),
    isFormValidated: (context: RegisterContext, event: DoneEventObject) =>
      event.data === true,
    shouldBlock: (context: RegisterContext) => true
  },
  services: {
    submitAsync: async (context: RegisterContext): Promise<any> => {
      await new Promise((res) => setTimeout(res, 2000));
      const serverError = false;
      if (serverError) return Promise.reject();
      const success = context.login !== 'mylogin';
      return Promise.resolve(success);
    }
  },
  actions: {
    updateIncomplete: assign(
      (context: RegisterContext, event: FormEvents) => context
    ),
    onBlock: assign((context: RegisterContext, event: FormEvents) => context),
    onValidated: assign(
      (context: RegisterContext, event: FormEvents) => context
    ),
    onFormError: assign((context: RegisterContext, event: FormEvents) => {
      const login = get(event, 'formData.login', context.login);
      const password = get(event, 'formData.password', context.password);
      const consent = get(event, 'formData.consent', context.consent);
      return {
        invalidLogin: isEmpty(login),
        invalidPasswordMessage:
          (password?.length ?? 0) > 6 ? undefined : 'Trop court!',
        invalidConsent: consent !== true
      };
    }),
    onUpdate: assign((context: RegisterContext, event: FormEvents) => {
      return {
        ...context,
        ...get(event, 'formData')
      };
    })
  },
  activities: {},
  delays: {}
};
