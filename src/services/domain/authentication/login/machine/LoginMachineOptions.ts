import { get, isEmpty } from 'lodash';
import { assign, DoneEventObject, sendParent } from 'xstate';
import { Credentials } from '../../../../../models/auth/Credentials';
import { login } from '../../../../api/login';
import { FormErrorEvent, FormEvent, FormEvents, FormUpdateEvent } from '../../../form/definition/FormEvents';
import { FormMachineOptions } from '../../../form/machine/FormMachineOptions';
import { LoginContext, LoginErrors } from '../definition/LoginContext';

const isComplete = (context: LoginContext): boolean => !isEmpty(context.email) && !!(context.password && context.password.length);

export const LoginMachineOptions: FormMachineOptions<LoginContext> = {
  guards: {
    isFormComplete: isComplete,
    isFormIncomplete: (context: LoginContext) => !isComplete(context),
    isFormValidated: (context: LoginContext, event: DoneEventObject) => event.data.isAuthenticated === true,
    shouldBlock: (context: LoginContext, event: DoneEventObject) => true
  },
  services: {
    submitAsync: async (context: LoginContext): Promise<any> => {
      // "email": "eManolo@classicmodelcars.com",
      // "password": "pwd"
      const credentials: Credentials = {
        email: context.email!,
        password: context.password!
      };
      const t = await login(context.apiClient, credentials);
      return t;
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
      const email = get(event, 'formData.login', context.email);
      const password = get(event, 'formData.password', context.password);
      const errors: LoginErrors = {};
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
    onBlock: assign((context: LoginContext, event: FormEvents) => context),
    onValidated: sendParent((context, event: DoneEventObject) => {
      return { type: FormEvent.Validate, data: event.data.token };
    }),
    onFormError: assign({
      errors: (context, event) => {
        const { data } = event as FormErrorEvent;
        return { message: data.response.data.message };
      }
    })
  },
  activities: {},
  delays: {}
};
