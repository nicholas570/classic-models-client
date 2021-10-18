import { FormStates } from '../../../domain/form/definition/FormSchema';
import { RegisterState } from '../../../domain/register/machine/RegisterMachine';

export const firstNameErrorSelector = (state: RegisterState) => state.context.errors?.firstName;
export const lastNameErrorSelector = (state: RegisterState) => state.context.errors?.lastName;
export const emailErrorSelector = (state: RegisterState) => state.context.errors?.email;
export const passwordErrorSelector = (state: RegisterState) => state.context.errors?.password;
export const invalidCredentialsSelector = (state: RegisterState) => state.context.errors?.invalidCredentials;

export const isValidationDisabledSelector = (state: RegisterState) =>
  !state.matches(FormStates.EditingComplete) && !state.matches(FormStates.Validated);
export const isLoadingSelector = (state: RegisterState) => state.matches(FormStates.Submitting);
export const isRegisteredSelector = (state: RegisterState) => state.matches(FormStates.Validated);
export const isInvalidCredentialsSelector = (state: RegisterState) => state.matches(FormStates.ValidationFailed);
export const invalidCredentialsErrorSelector = (state: RegisterState) => state.context.errors?.invalidCredentials;
