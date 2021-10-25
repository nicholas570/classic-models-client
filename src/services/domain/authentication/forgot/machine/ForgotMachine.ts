import { State } from 'xstate';
import { FormEvents } from '../../../form/definition/FormEvents';
import { FormSchema, FormStates } from '../../../form/definition/FormSchema';
import { CreateFormMachine } from '../../../form/machine/CreateFormMachine';
import { ForgotContext } from '../definition/ForgotContext';
import { ForgotMachineOptions } from './ForgotMachineOptions';

export type ForgotState = State<
  ForgotContext,
  FormEvents,
  FormSchema,
  {
    value: FormStates;
    context: ForgotContext;
  }
>;

export const ForgotMachine = CreateFormMachine<ForgotContext>(ForgotMachineOptions);
