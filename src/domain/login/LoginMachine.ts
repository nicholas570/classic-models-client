import { CreateFormMachine } from '../form/CreateFormMachine';
import { LoginContext } from './definition/LoginContext';
import { LoginOptions } from './LoginOptions';

export const LoginFormMachine = CreateFormMachine<LoginContext>(LoginOptions);
