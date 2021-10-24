import { FormStates } from '../../../services/domain/form/definition/FormSchema';
import { ForgotState } from '../../../services/domain/authentication/forgot/machine/ForgotMachine';

/**
 * functions which restrict which parts
 * of the state can result in components re-rendering.
 */
export const emailErrorSelector = (state: ForgotState) => state.context.errors?.email;

export const isValidationDisabledSelector = (state: ForgotState) =>
  !state.matches(FormStates.EditingComplete) && !state.matches(FormStates.Validated);
export const isInvalidCredentialsSelector = (state: ForgotState) => state.matches(FormStates.ValidationFailed);
export const invalidCredentialsSelector = (state: ForgotState) => state.context.errors?.invalidCredentials;
export const isLoadingSelector = (state: ForgotState) => state.matches(FormStates.Submitting);
