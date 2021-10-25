import { State } from 'xstate';
import { FormEvents } from '../../../form/definition/FormEvents';
import { FormSchema, FormStates } from '../../../form/definition/FormSchema';
import { CreateFormMachine } from '../../../form/machine/CreateFormMachine';
import { LoginContext } from '../definition/LoginContext';
import { LoginMachineOptions } from './LoginMachineOptions';

export type LoginState = State<
  LoginContext,
  FormEvents,
  FormSchema,
  {
    value: FormStates;
    context: LoginContext;
  }
>;

export const LoginMachine = CreateFormMachine<LoginContext>(LoginMachineOptions);
