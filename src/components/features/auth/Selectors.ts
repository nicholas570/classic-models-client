import { AuthStates } from '../../../domain/auth/definition/AuthSchema';
import { AuthState } from '../../../domain/auth/machine/AuthMachine';

export const loginSelector = (state: AuthState) => state.matches(AuthStates.SignIn);
export const registerSelector = (state: AuthState) => state.matches(AuthStates.Register);
export const forgotSelector = (state: AuthState) => state.matches(AuthStates.Forgot);
