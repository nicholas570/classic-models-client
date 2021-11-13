import { interpret } from 'xstate';
import { FormEvent } from '../../../form/definition/FormEvents';
import { AuthEvents } from '../definition/AuthEvents';
import { AuthStates } from '../definition/AuthSchema';
import { AuthMachine } from '../machine/AuthMachine';

it('should be in editing on initial state', () => {
  const expectedValue = AuthStates.Login;
  const actualState = AuthMachine.initialState;

  expect(actualState.matches(expectedValue)).toBeTruthy();
});

describe('transition to sign in state', () => {
  it('should go to sign in from register', () => {
    const expectedValue = AuthStates.Login;
    const actualState = AuthMachine.transition(AuthStates.Forgot, { type: AuthEvents.SignIn });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  it('should go to sign in from forgot', () => {
    const expectedValue = AuthStates.Login;
    const actualState = AuthMachine.transition(AuthStates.Register, { type: AuthEvents.SignIn });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
});

describe('transition to forgot state', () => {
  it('should go to forgot from sign in', () => {
    const expectedValue = AuthStates.Forgot;
    const actualState = AuthMachine.transition(AuthStates.Login, { type: AuthEvents.Forgot });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  it('should not go to forgot from register', () => {
    const expectedValue = AuthStates.Forgot;
    const actualState = AuthMachine.transition(AuthStates.Register, { type: AuthEvents.Forgot });

    expect(actualState.matches(expectedValue)).not.toBeTruthy();
  });
});

describe('transition to register state', () => {
  it('should go to register in from sign in', () => {
    const expectedValue = AuthStates.Register;
    const actualState = AuthMachine.transition(AuthStates.Login, { type: AuthEvents.Register });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  it('should not go to register from forgot', () => {
    const expectedValue = AuthStates.Login;
    const actualState = AuthMachine.transition(AuthStates.Forgot, { type: AuthEvents.Register });

    expect(actualState.matches(expectedValue)).not.toBeTruthy();
  });
});

describe('auth service actions', () => {
  it('should assign the login machine ref on entering sign in', (done) => {
    const authService = interpret(
      AuthMachine.withContext({ loginRef: undefined, registerRef: undefined, forgotRef: undefined, token: undefined, redirect: jest.fn() })
    ).onTransition((state) => {
      if (state.matches(AuthStates.Login)) {
        expect(state.context.loginRef).not.toBeUndefined();
        expect(state.context.registerRef).toBeUndefined();
        expect(state.context.forgotRef).toBeUndefined();
        done();
      }
    });

    authService.start();
  });
  it('should assign the register machine ref on entering register', (done) => {
    const authService = interpret(
      AuthMachine.withContext({ loginRef: undefined, registerRef: undefined, forgotRef: undefined, token: undefined, redirect: jest.fn() })
    ).onTransition((state) => {
      if (state.matches(AuthStates.Register)) {
        expect(state.context.registerRef).not.toBeUndefined();
        expect(state.context.loginRef).not.toBeUndefined();
        expect(state.context.forgotRef).toBeUndefined();
        done();
      }
    });

    authService.start();
    authService.send({ type: AuthEvents.Register });
  });
  it('should assign the forgot machine ref on entering forgot', (done) => {
    const authService = interpret(
      AuthMachine.withContext({ loginRef: undefined, registerRef: undefined, forgotRef: undefined, token: undefined, redirect: jest.fn() })
    ).onTransition((state) => {
      if (state.matches(AuthStates.Forgot)) {
        expect(state.context.forgotRef).not.toBeUndefined();
        expect(state.context.registerRef).toBeUndefined();
        expect(state.context.loginRef).not.toBeUndefined();
        done();
      }
    });

    authService.start();
    authService.send({ type: AuthEvents.Forgot });
  });
  it('should assign the auth token validate event', (done) => {
    const authService = interpret(
      AuthMachine.withContext({ loginRef: undefined, registerRef: undefined, forgotRef: undefined, token: undefined, redirect: jest.fn() })
    ).onTransition((state) => {
      if (state.matches(AuthStates.Authenticated)) {
        expect(state.context.token).not.toBeUndefined();
        done();
      }
    });

    authService.start();
    authService.send({ type: FormEvent.Validate, data: 'token' });
  });
});
