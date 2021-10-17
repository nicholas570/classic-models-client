import { CreateFormMachine } from '../../form/machine/CreateFormMachine';
import { RegisterContext } from '../definition/RegisterContext';
import { RegisterOptions } from './RegisterMachineOptions';

export const LoginFormMachine = CreateFormMachine<RegisterContext>(RegisterOptions);
