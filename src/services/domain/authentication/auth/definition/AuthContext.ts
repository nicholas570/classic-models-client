import { ActorRefFrom } from 'xstate';
import { ForgotMachine } from '../../forgot/machine/ForgotMachine';
import { LoginMachine } from '../../login/machine/LoginMachine';
import { RegisterMachine } from '../../register/machine/RegisterMachine';

export interface AuthContext {
  redirect: () => void;
  loginRef?: ActorRefFrom<typeof LoginMachine>;
  registerRef?: ActorRefFrom<typeof RegisterMachine>;
  forgotRef?: ActorRefFrom<typeof ForgotMachine>;
  token?: string;
}
