import { get, isEmpty } from 'lodash';
import { assign, DoneEventObject, sendParent } from 'xstate';
import { FormEvent, FormEvents, FormUpdateEvent } from '../../../form/definition/FormEvents';
import { FormMachineOptions } from '../../../form/machine/FormMachineOptions';
import { ForgotContext, ForgotErrors } from '../definition/ForgotContext';

const isComplete = (context: ForgotContext): boolean => !isEmpty(context.email);

export const ForgotMachineOptions: FormMachineOptions<ForgotContext> = {
  guards: {
    isFormComplete: isComplete,
    isFormIncomplete: (context: ForgotContext) => !isComplete(context),
    isFormValidated: (context: ForgotContext, event: DoneEventObject) => event.data === 'email',
    shouldBlock: (context: ForgotContext, event: DoneEventObject) => false
  },
  services: {
    submitAsync: async (context: ForgotContext): Promise<any> => {
      await new Promise((res) => setTimeout(res, 1000));
      const serverError = false;
      if (serverError) return Promise.reject();
      const success = context.email === 'email';
      return Promise.resolve(success);
    }
  },
  actions: {
    onUpdate: assign((context: ForgotContext, event: FormEvents) => {
      const { formData } = event as FormUpdateEvent;
      return {
        ...context,
        ...formData,
        errors: undefined
      };
    }),
    updateIncomplete: assign((context: ForgotContext, event: FormEvents) => {
      const email = get(event, 'formData.email', context.email);
      const errors: ForgotErrors = {};
      if (isEmpty(email)) {
        errors.email = 'Fill-in your email';
      }
      return {
        ...context,
        errors
      };
    }),
    onBlock: assign((context: ForgotContext, event: FormEvents) => context),
    onValidated: sendParent((context, event: DoneEventObject) => {
      return { type: FormEvent.Validate, data: event.data };
    }),
    onFormError: assign({
      errors: (context) => {
        return { invalidCredentials: 'Invalid email' };
      }
    })
  },
  activities: {},
  delays: {}
};
