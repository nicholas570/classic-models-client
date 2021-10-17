import { CreateFormMachine } from '../form/CreateFormMachine';
import { RegisterContext } from './definition/RegisterContext';
import { RegisterOptions } from './RegisterOptions';

export const LoginFormMachine = CreateFormMachine<RegisterContext>(RegisterOptions);
