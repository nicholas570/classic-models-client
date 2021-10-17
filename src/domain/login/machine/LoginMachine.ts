import { CreateFormMachine } from '../../form/machine/CreateFormMachine';
import { LoginContext } from '../definition/LoginContext';
import { LoginOptions } from './LoginMachineOptions';

export const LoginMachine = CreateFormMachine<LoginContext>(LoginOptions);
