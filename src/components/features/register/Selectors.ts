import { FormStates } from '../../../services/domain/form/definition/FormSchema';
import { RegisterState } from '../../../services/domain/authentication/register/machine/RegisterMachine';

/**
 * functions which restrict which parts
 * of the state can result in components re-rendering.
 */
export const lastNameErrorSelector = (state: RegisterState) => state.context.errors?.lastName;
export const firstNameErrorSelector = (state: RegisterState) => state.context.errors?.firstName;
export const extensionErrorSelector = (state: RegisterState) => state.context.errors?.extension;
export const emailErrorSelector = (state: RegisterState) => state.context.errors?.email;
export const officeCodeErrorSelector = (state: RegisterState) => state.context.errors?.officeCode;
export const jobTitleErrorSelector = (state: RegisterState) => state.context.errors?.jobTitle;
export const passwordErrorSelector = (state: RegisterState) => state.context.errors?.password;
export const errorMessageSelector = (state: RegisterState) => state.context.errors?.message;

export const isValidationDisabledSelector = (state: RegisterState) =>
  !state.matches(FormStates.EditingComplete) && !state.matches(FormStates.Validated);
export const isLoadingSelector = (state: RegisterState) => state.matches(FormStates.Submitting);
export const isRegisteredSelector = (state: RegisterState) => state.matches(FormStates.Validated);
export const isInvalidCredentialsSelector = (state: RegisterState) => state.matches(FormStates.ValidationFailed);
