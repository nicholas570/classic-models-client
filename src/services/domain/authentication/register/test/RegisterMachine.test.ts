import { interpret } from 'xstate';
import { createNewEmployee } from '../../../../../models/utils/createEmployee';
import { createApiClient } from '../../../../api/utils/apiClient';
import { FormStates } from '../../../form/definition/FormSchema';
import { RegisterContext } from '../definition/RegisterContext';
import { RegisterMachine } from '../machine/RegisterMachine';
import { isComplete } from '../machine/RegisterMachineOptions';

describe('isComplete guard', () => {
  it('should not validate the context', () => {
    const context: RegisterContext = {
      apiClient: createApiClient(),
      employee: {
        lastName: 'something',
        firstName: 'something',
        extension: undefined,
        email: 'something',
        officeCode: 'something',
        jobTitle: undefined,
        password: 'something'
      }
    };

    expect(isComplete(context)).toBeFalsy();
  });

  it('should not validate the context', () => {
    const context: RegisterContext = {
      apiClient: createApiClient(),
      employee: {
        lastName: 'something',
        firstName: 'something',
        extension: 'something',
        email: 'something',
        officeCode: 'something',
        jobTitle: 'something',
        password: 'something'
      }
    };

    expect(isComplete(context)).toBeTruthy();
  });
});

describe('Register machine options', () => {
  const machine = RegisterMachine.withContext({
    apiClient: createApiClient(),
    employee: createNewEmployee(),
    offices: undefined,
    errors: undefined
  });

  it('should fetch the offices', (done) => {
    const registerService = interpret(machine).onTransition((state) => {
      if (state.matches(FormStates.Editing)) {
        expect(state.context.offices).not.toBeUndefined();
        done();
      }
    });

    registerService.start();
  });
});
