import { History } from 'history/index';
import { ActorRefFrom } from 'xstate';
import { ForgotMachine } from '../../forgot/machine/ForgotMachine';
import { LoginMachine } from '../../login/machine/LoginMachine';
import { RegisterMachine } from '../../register/machine/RegisterMachine';

export interface AuthContext {
  history: History;
  loginRef?: ActorRefFrom<typeof LoginMachine>;
  registerRef?: ActorRefFrom<typeof RegisterMachine>;
  forgotRef?: ActorRefFrom<typeof ForgotMachine>;
  token?: string;
}
