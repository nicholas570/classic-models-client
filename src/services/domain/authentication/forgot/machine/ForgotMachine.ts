import { State } from 'xstate';
import { FormEvents } from '../../../form/definition/FormEvents';
import { FormSchema } from '../../../form/definition/FormSchema';
import { CreateFormMachine } from '../../../form/machine/CreateFormMachine';
import { ForgotContext } from '../definition/ForgotContext';
import { ForgotMachineOptions } from './ForgotMachineOptions';

export type ForgotState = State<
  ForgotContext,
  FormEvents,
  FormSchema,
  {
    value: any;
    context: ForgotContext;
  }
>;

export const LoginMachine = CreateFormMachine<ForgotContext>(ForgotMachineOptions);
