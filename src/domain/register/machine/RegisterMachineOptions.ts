import { get, isEmpty, values, every } from 'lodash';
import { assign, DoneEventObject } from 'xstate';
import { FormEvents } from '../../form/definition/FormEvents';
import { FormMachineOptions } from '../../form/machine/FormMachineOptions';
import { RegisterContext } from '../definition/RegisterContext';

const isComplete = (context: RegisterContext): boolean => {
  const contextValues = values(context);
  return !!(context.firstName && context.lastName && context.email && context.password) && every(contextValues, (value) => !isEmpty(value));
};

export const RegisterOptions: FormMachineOptions<RegisterContext> = {
  guards: {
    isFormComplete: (context: RegisterContext) => isComplete(context),
    isFormIncomplete: (context: RegisterContext) => !isComplete(context),
    isFormValidated: (context: RegisterContext, event: DoneEventObject) => event.data === true,
    shouldBlock: (context: RegisterContext) => true
  },
  services: {
    submitAsync: async (context: RegisterContext): Promise<any> => {
      await new Promise((res) => setTimeout(res, 2000));
      const serverError = false;
      if (serverError) return Promise.reject();
      const success = true;
      return Promise.resolve(success);
    }
  },
  actions: {
    updateIncomplete: assign((context: RegisterContext, event: FormEvents) => context),
    onBlock: assign((context: RegisterContext, event: FormEvents) => context),
    onValidated: assign((context: RegisterContext, event: FormEvents) => context),
    onFormError: assign((context: RegisterContext, event: FormEvents) => {
      const firstName = get(event, 'formData.firstName', context.firstName);
      const lastName = get(event, 'formData.lastName', context.lastName);
      const password = get(event, 'formData.password', context.password);
      const email = get(event, 'formData.email', context.email);
      return {
        ...context
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
