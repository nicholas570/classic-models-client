import { FormStates } from '../../../domain/form/definition/FormSchema';
import { LoginState } from '../../../domain/login/machine/LoginMachine';

export const isLoginErrorSelector = (state: LoginState) => state.context.errors?.login;
export const isPasswordErrorSelector = (state: LoginState) => state.context.errors?.password;
export const isValidationDisabled = (state: LoginState) => !state.matches(FormStates.EditingComplete);
