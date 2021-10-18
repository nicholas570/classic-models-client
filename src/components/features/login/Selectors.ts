import { FormStates } from '../../../domain/form/definition/FormSchema';
import { LoginState } from '../../../domain/login/machine/LoginMachine';

export const loginErrorSelector = (state: LoginState) => state.context.errors?.login;
export const passwordErrorSelector = (state: LoginState) => state.context.errors?.password;

export const isValidationDisabledSelector = (state: LoginState) =>
  !state.matches(FormStates.EditingComplete) && !state.matches(FormStates.Validated);
export const isLoadingSelector = (state: LoginState) => state.matches(FormStates.Submitting);
export const isLoggedInSelector = (state: LoginState) => state.matches(FormStates.Validated);
export const isInvalidCredentialsSelector = (state: LoginState) => state.matches(FormStates.ValidationFailed);
export const invalidCredentialsSelector = (state: LoginState) => state.context.errors?.invalidCredentials;
