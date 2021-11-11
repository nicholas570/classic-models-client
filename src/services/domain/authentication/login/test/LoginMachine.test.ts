import { DoneInvokeEvent, interpret } from 'xstate';
import { AuthResponse } from '../../../../../models/api/response';
import { createApiClient } from '../../../../api/utils/apiClient';
import { FormEvent } from '../../../form/definition/FormEvents';
import { FormStates } from '../../../form/definition/FormSchema';
import { LoginContext } from '../definition/LoginContext';
import { LoginMachine } from '../machine/LoginMachine';
import { isComplete, isValidated } from '../machine/LoginMachineOptions';

describe('isComplete guard', () => {
  it('should not validate the context', () => {
    const context: LoginContext = {
      apiClient: createApiClient(),
      email: '',
      password: '',
      errors: {}
    };

    expect(isComplete(context)).toBeFalsy();
  });

  it('should not validate the context', () => {
    const context: LoginContext = {
      apiClient: createApiClient(),
      email: 'mail',
      password: 'rd',
      errors: {}
    };

    expect(isComplete(context)).toBeFalsy();
  });

  it('should validate the context', () => {
    const context: LoginContext = {
      apiClient: createApiClient(),
      email: 'm',
      password: 'rd43',
      errors: {}
    };

    expect(isComplete(context)).toBeTruthy();
  });
});

describe('isValidated guard', () => {
  it('should not validate the event', () => {
    const event: DoneInvokeEvent<AuthResponse> = {
      type: 'done.invoke.submitAsync',
      data: {
        isAuthenticated: false,
        token: ''
      }
    };

    expect(isValidated(event)).toBeFalsy();
  });

  it('should validate the event', () => {
    const event: DoneInvokeEvent<AuthResponse> = {
      type: 'done.invoke.submitAsync',
      data: {
        isAuthenticated: true,
        token: 'sqdqsdqezzaqdqsd.qfqzrezaer.arazedaze543dz5e'
      }
    };

    expect(isValidated(event)).toBeTruthy();
  });
});

describe('Login machine options', () => {
  const machine = LoginMachine.withContext({
    apiClient: createApiClient(),
    email: undefined,
    password: undefined,
    errors: undefined
  });

  it('should assign password error on invalid form', (done) => {
    const loginService = interpret(machine).onTransition((state) => {
      if (state.matches(FormStates.Editing)) {
        loginService.send({ type: FormEvent.UpdateForm, formData: { email: 'email.com' } });
      }
      if (state.matches(FormStates.InvalidForm)) {
        expect(state.context.errors?.password).not.toBeUndefined();
        done();
      }
    });

    loginService.start();
  });

  it('should assign too short password error on invalid form', (done) => {
    const loginService = interpret(machine).onTransition((state) => {
      if (state.matches(FormStates.Editing)) {
        loginService.send({ type: FormEvent.UpdateForm, formData: { password: '2' } });
      }
      if (state.matches(FormStates.InvalidForm)) {
        expect(state.context.errors?.password).not.toBeUndefined();
        done();
      }
    });

    loginService.start();
  });

  it('should assign email error on invalid form', (done) => {
    const loginService = interpret(machine).onTransition((state) => {
      if (state.matches(FormStates.Editing)) {
        loginService.send({ type: FormEvent.UpdateForm, formData: { email: '' } });
      }
      if (state.matches(FormStates.InvalidForm)) {
        expect(state.context.errors?.email).not.toBeUndefined();
        done();
      }
    });

    loginService.start();
  });
});
