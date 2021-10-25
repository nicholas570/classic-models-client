import { AuthEvents } from '../definition/AuthEvents';
import { AuthStates } from '../definition/AuthSchema';
import { AuthMachine } from '../machine/AuthMachine';

it('should be in editing on initial state', () => {
  const expectedValue = AuthStates.SignIn;
  const actualState = AuthMachine.initialState;

  expect(actualState.matches(expectedValue)).toBeTruthy();
});

describe('transition to forgot state', () => {
  it('should go to forgot from sign in', () => {
    const expectedValue = AuthStates.Forgot;
    const actualState = AuthMachine.transition(AuthStates.SignIn, { type: AuthEvents.Forgot });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  it('should not go to forgot from register', () => {
    const expectedValue = AuthStates.Forgot;
    const actualState = AuthMachine.transition(AuthStates.Register, { type: AuthEvents.Forgot });

    expect(actualState.matches(expectedValue)).not.toBeTruthy();
  });
});

describe('transition to sign in state', () => {
  it('should go to sign in from register', () => {
    const expectedValue = AuthStates.SignIn;
    const actualState = AuthMachine.transition(AuthStates.Forgot, { type: AuthEvents.SignIn });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  it('should go to sign in from forgot', () => {
    const expectedValue = AuthStates.SignIn;
    const actualState = AuthMachine.transition(AuthStates.Register, { type: AuthEvents.SignIn });

    expect(actualState.matches(expectedValue)).not.toBeTruthy();
  });
});
