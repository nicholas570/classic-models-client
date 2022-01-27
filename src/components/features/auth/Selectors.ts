import { AuthStates } from '../../../services/domain/authentication/auth/definition/AuthSchema';
import { AuthState } from '../../../services/domain/authentication/auth/machine/AuthMachine';

export const loginSelector = (state: AuthState) => state.matches(AuthStates.LOGIN);
export const registerSelector = (state: AuthState) => state.matches(AuthStates.REGISTER);
export const forgotSelector = (state: AuthState) => state.matches(AuthStates.FORGOT);
