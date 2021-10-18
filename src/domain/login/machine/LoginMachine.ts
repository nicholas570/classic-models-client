import { State } from 'xstate';
import { FormEvents } from '../../form/definition/FormEvents';
import { FormSchema } from '../../form/definition/FormSchema';
import { CreateFormMachine } from '../../form/machine/CreateFormMachine';
import { LoginContext } from '../definition/LoginContext';
import { LoginOptions } from './LoginMachineOptions';

export type LoginState = State<
  LoginContext,
  FormEvents,
  FormSchema,
  {
    value: any;
    context: LoginContext;
  }
>;

export const LoginMachine = CreateFormMachine<LoginContext>(LoginOptions);
