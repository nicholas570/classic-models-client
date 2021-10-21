import { get, isEmpty, every } from 'lodash';
import { assign, DoneEventObject, sendParent } from 'xstate';
import { FormEvent, FormEvents, FormUpdateEvent } from '../../../form/definition/FormEvents';
import { FormMachineOptions } from '../../../form/machine/FormMachineOptions';
import { RegisterContext, RegisterErrors } from '../definition/RegisterContext';

const isComplete = (context: RegisterContext): boolean => {
  const formValues = [context.firstName, context.lastName, context.email, context.password];
  return (
    !!(context.firstName && context.lastName && context.email && context.password) &&
    context.password.length >= 6 &&
    every(formValues, (value) => !isEmpty(value))
  );
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
    updateIncomplete: assign((context: RegisterContext, event: FormEvents) => {
      const errors: RegisterErrors = {};
      const firstName = get(event, 'formData.firstName', context.firstName);
      const lastName = get(event, 'formData.lastName', context.lastName);
      const password = get(event, 'formData.password', context.password);
      const email = get(event, 'formData.email', context.email);
      if (isEmpty(firstName)) {
        errors.firstName = 'Fill-in your first name';
      }
      if (isEmpty(lastName)) {
        errors.lastName = 'Fill-in your last name';
      }
      if (isEmpty(email)) {
        errors.email = 'Fill-in your email';
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
    onUpdate: assign((context: RegisterContext, event: FormEvents) => {
      const { formData } = event as FormUpdateEvent;
      return {
        ...context,
        ...formData,
        errors: undefined
      };
    }),
    onValidated: sendParent((context, event: DoneEventObject) => {
      return { type: FormEvent.Validate, data: true };
    }),
    onFormError: assign({
      errors: (context) => {
        return { invalidCredentials: 'Invalid credentials' };
      }
    }),
    onBlock: assign((context: RegisterContext, event: FormEvents) => context)
  },
  activities: {},
  delays: {}
};
