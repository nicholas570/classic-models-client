import { AuthStates } from '../../../services/domain/authentication/auth/definition/AuthSchema';
import { AuthState } from '../../../services/domain/authentication/auth/machine/AuthMachine';

export const loginSelector = (state: AuthState) => state.matches(AuthStates.Login);
export const registerSelector = (state: AuthState) => state.matches(AuthStates.Register);
export const forgotSelector = (state: AuthState) => state.matches(AuthStates.Forgot);
