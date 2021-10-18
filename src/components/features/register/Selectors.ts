import { FormStates } from '../../../domain/form/definition/FormSchema';
import { RegisterState } from '../../../domain/register/machine/RegisterMachine';

export const firstNameErrorSelector = (state: RegisterState) => state.context.errors?.firstName;
export const lastNameErrorSelector = (state: RegisterState) => state.context.errors?.lastName;
export const emailErrorSelector = (state: RegisterState) => state.context.errors?.email;
export const passwordErrorSelector = (state: RegisterState) => state.context.errors?.password;
export const invalidCredentialsErrorSelector = (state: RegisterState) => state.context.errors?.invalidCredentials;
