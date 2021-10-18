import { State } from 'xstate';
import { FormEvents } from '../../form/definition/FormEvents';
import { CreateFormMachine } from '../../form/machine/CreateFormMachine';
import { RegisterContext } from '../definition/RegisterContext';
import { RegisterOptions } from './RegisterMachineOptions';

export type RegisterState = State<
  RegisterContext,
  FormEvents,
  any,
  {
    value: any;
    context: RegisterContext;
  }
>;

export const RegisterMachine = CreateFormMachine<RegisterContext>(RegisterOptions);
