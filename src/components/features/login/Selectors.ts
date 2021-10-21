import { FormStates } from '../../../services/domain/form/definition/FormSchema';
import { LoginState } from '../../../services/domain/authentication/login/machine/LoginMachine';

/**
 * functions which restrict which parts
 * of the state can result in components re-rendering.
 */
export const loginErrorSelector = (state: LoginState) => state.context.errors?.login;
export const passwordErrorSelector = (state: LoginState) => state.context.errors?.password;

export const isValidationDisabledSelector = (state: LoginState) =>
  !state.matches(FormStates.EditingComplete) && !state.matches(FormStates.Validated);
export const isLoadingSelector = (state: LoginState) => state.matches(FormStates.Submitting);
export const isLoggedInSelector = (state: LoginState) => state.matches(FormStates.Validated);
export const isInvalidCredentialsSelector = (state: LoginState) => state.matches(FormStates.ValidationFailed);
export const invalidCredentialsSelector = (state: LoginState) => state.context.errors?.invalidCredentials;
