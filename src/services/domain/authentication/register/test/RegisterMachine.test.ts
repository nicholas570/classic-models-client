import { interpret } from 'xstate';
import { Office } from '../../../../../models/api/offices';
import { createNewEmployee } from '../../../../../models/utils/createEmployee';
import { loginErrorMock } from '../../../../../test/mocks/loginErrorMock';
import { officesMock } from '../../../../../test/mocks/officesMock';
import { createApiClient } from '../../../../api/utils/apiClient';
import { FormEvent } from '../../../form/definition/FormEvents';
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
        password: 'ze'
      }
    };

    expect(isComplete(context)).toBeFalsy();
  });

  it('should validate the context', () => {
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
    const registerService = interpret(
      machine.withConfig({
        services: {
          fetchResources: async (context: RegisterContext): Promise<Office[]> => {
            return Promise.resolve(officesMock);
          }
        }
      })
    ).onTransition((state) => {
      if (state.matches(FormStates.Editing)) {
        expect(state.context.offices).not.toBeUndefined();
        done();
      }
    });

    registerService.start();
  });

  describe('errors', () => {
    it('should assign errors on invalid form', (done) => {
      const registerService = interpret(machine).onTransition((state) => {
        if (state.matches(FormStates.Editing)) {
          registerService.send({
            type: FormEvent.UpdateForm,
            formData: {
              lastName: '',
              firstName: '',
              extension: '',
              email: '',
              officeCode: '',
              jobTitle: '',
              password: ''
            }
          });
        }
        if (state.matches(FormStates.InvalidForm)) {
          expect(state.context.errors?.lastName).not.toBeUndefined();
          expect(state.context.errors?.firstName).not.toBeUndefined();
          expect(state.context.errors?.officeCode).not.toBeUndefined();
          expect(state.context.errors?.extension).not.toBeUndefined();
          expect(state.context.errors?.jobTitle).not.toBeUndefined();
          expect(state.context.errors?.email).not.toBeUndefined();
          expect(state.context.errors?.password).not.toBeUndefined();
          done();
        }
      });

      registerService.start();
    });

    it('should assign too short password error on invalid form', (done) => {
      const registerService = interpret(machine).onTransition((state) => {
        if (state.matches(FormStates.Editing)) {
          registerService.send({
            type: FormEvent.UpdateForm,
            formData: { password: 'sd' }
          });
        }
        if (state.matches(FormStates.InvalidForm)) {
          expect(state.context.errors?.password).not.toBeUndefined();
          done();
        }
      });

      registerService.start();
    });
  });

  it('should failed the validation', (done) => {
    let hasValidated = false;
    const registerService = interpret(
      machine.withConfig({
        services: {
          submitAsync: async (context: RegisterContext): Promise<any> => {
            return Promise.reject(loginErrorMock);
          }
        },
        actions: { onValidated: () => (hasValidated = true) }
      })
    ).onTransition((state) => {
      if (state.matches(FormStates.Editing)) {
        registerService.send({
          type: FormEvent.UpdateForm,
          formData: {
            password: 'sdds',
            email: 'eManolo@classicmodelcars.com',
            lastName: 'Bates',
            firstName: 'John',
            extension: 'sdf34',
            officeCode: '4',
            jobTitle: 'a nice job'
          }
        });
      }
      if (state.matches(FormStates.EditingComplete)) {
        registerService.send({ type: FormEvent.Validate });
      }
      if (state.matches(FormStates.ValidationFailed)) {
        expect(state.context.errors?.message).not.toBeUndefined();
        expect(hasValidated).toBeFalsy();
        done();
      }
    });

    registerService.start();
  });

  it('should success the validation', (done) => {
    let hasValidated = false;
    const registerService = interpret(
      machine.withConfig({
        services: {
          submitAsync: async (context: RegisterContext): Promise<any> => {
            return Promise.resolve('success');
          }
        },
        actions: { onValidated: () => (hasValidated = true) }
      })
    ).onTransition((state) => {
      if (state.matches(FormStates.Editing)) {
        registerService.send({
          type: FormEvent.UpdateForm,
          formData: {
            password: 'sdds',
            email: 'test@classicmodelcars.com',
            lastName: 'Bates',
            firstName: 'John',
            extension: 'sdf34',
            officeCode: '4',
            jobTitle: 'a nice job'
          }
        });
      }
      if (state.matches(FormStates.EditingComplete)) {
        registerService.send({ type: FormEvent.Validate });
      }
      if (state.matches(FormStates.Validated)) {
        expect(hasValidated).toBeTruthy();
        done();
      }
    });

    registerService.start();
  });
});
