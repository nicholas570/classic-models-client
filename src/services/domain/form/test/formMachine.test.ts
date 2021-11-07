import { AxiosInstance } from 'axios';
import { get, isEmpty } from 'lodash';
import { assign, DoneEventObject, DoneInvokeEvent, interpret } from 'xstate';
import { ErrorResponse, ResponseContent } from '../../../../models/api/response';
import { createApiClient } from '../../../api/utils/apiClient';
import { FormErrorEvent, FormEvent, FormEvents, FormUpdateEvent } from '../definition/FormEvents';
import { FormStates } from '../definition/FormSchema';
import { createFormMachine } from '../machine/CreateFormMachine';
import { FormMachineOptions } from '../machine/FormMachineOptions';

interface FormMachineErrors {
  message?: string;
}

interface FormMachineContext {
  apiClient: AxiosInstance;
  testValue?: string;
  resources?: string[];
  errors?: FormMachineErrors;
}

const formMachineContext = {
  apiClient: createApiClient(),
  testValue: undefined
};

const isComplete = (context: FormMachineContext): boolean =>
  !isEmpty(context.testValue) && !!(context.testValue && context.testValue.length);

const options: FormMachineOptions<FormMachineContext> = {
  guards: {
    shouldFetch: (context: FormMachineContext) => true,
    isFormComplete: isComplete,
    isFormIncomplete: (context: FormMachineContext) => !isComplete(context),
    isFormValidated: (context: FormMachineContext, event: DoneEventObject) => event.data === 'validated',
    shouldBlock: (context: FormMachineContext, event: DoneEventObject) => false
  },
  services: {
    fetchResources: async (context: FormMachineContext): Promise<any> => {
      return Promise.resolve(['resource 1', 'resource 2', 'resource 3']);
    },
    submitAsync: async (context: FormMachineContext): Promise<any> => {
      return Promise.resolve('validated');
    }
  },
  actions: {
    onFetched: assign({
      resources: (context, event: DoneInvokeEvent<string[]>) => {
        return event.data;
      }
    }),
    onUpdate: assign((context: FormMachineContext, event: FormEvents) => {
      const { formData } = event as FormUpdateEvent;

      return {
        ...context,
        ...formData,
        errors: undefined
      };
    }),
    updateIncomplete: assign((context: FormMachineContext, event: FormEvents) => {
      const testValue = get(event, 'formData.testValue', context.testValue);
      const errors: FormMachineErrors = {};
      if (isEmpty(testValue)) {
        errors.message = 'Fill-in the form';
      } else if (testValue.length < 6) {
        errors.message = 'too short :)';
      }
      return {
        ...context,
        errors
      };
    }),
    onBlock: assign((context: FormMachineContext, event: FormEvents) => context),
    onValidated: assign((context: FormMachineContext, event: FormEvents) => context),
    onFormError: assign({
      errors: (context, event) => {
        const { data: eventData } = event as FormErrorEvent;
        const { payload } = eventData.response.data as ResponseContent<ErrorResponse>;
        const { message } = payload;
        return { message };
      }
    })
  },
  activities: {},
  delays: {}
};

describe('formMachine transitions', () => {
  const formMachine = createFormMachine(options).withContext(formMachineContext);

  it('should be in fetching on initial state', async () => {
    const expectedValue = FormStates.Fetching;
    const actualState = formMachine.initialState;

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });

  it('should go to editing from fetching', (done) => {
    const formService = interpret(formMachine).onTransition((state) => {
      if (state.matches(FormStates.Editing)) {
        expect(state.context.resources).not.toBeUndefined();
        done();
      }
    });

    formService.start();
  });

  it('should go to editingComplete from editing', (done) => {
    const formService = interpret(formMachine).onTransition((state) => {
      if (state.matches(FormStates.Editing)) {
        formService.send({ type: FormEvent.UpdateForm, formData: { testValue: 'This is a message from Mars' } });
      }
      if (state.matches(FormStates.EditingComplete)) {
        expect(state.context.testValue).not.toBeUndefined();
        done();
      }
    });

    formService.start();
  });
});
