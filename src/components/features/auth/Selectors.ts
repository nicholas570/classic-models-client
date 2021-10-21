import { AuthStates } from '../../../services/domain/authentication/auth/definition/AuthSchema';
import { AuthState } from '../../../services/domain/authentication/auth/machine/AuthMachine';

export const loginSelector = (state: AuthState) => state.matches(AuthStates.SignIn);
export const registerSelector = (state: AuthState) => state.matches(AuthStates.Register);
export const forgotSelector = (state: AuthState) => state.matches(AuthStates.Forgot);
export const isAuthenticatedSelector = (state: AuthState) => state.matches(AuthStates.Authenticated);
