import { State } from 'xstate';
import { FormEvents } from '../../../form/definition/FormEvents';
import { FormSchema, FormStates } from '../../../form/definition/FormSchema';
import { CreateFormMachine } from '../../../form/machine/CreateFormMachine';
import { RegisterContext } from '../definition/RegisterContext';
import { RegisterMachineOptions } from './RegisterMachineOptions';

export type RegisterState = State<
  RegisterContext,
  FormEvents,
  FormSchema,
  {
    value: FormStates;
    context: RegisterContext;
  }
>;

export const RegisterMachine = CreateFormMachine<RegisterContext>(RegisterMachineOptions);
