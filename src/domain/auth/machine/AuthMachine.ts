import { Machine } from 'xstate';
import { AuthEvent } from '../definition/AuthEvents';
import { AuthSchema } from '../definition/AuthSchema';
import { AuthMachineConfig } from './AuthMachineConfig';

export const AuthMachine = Machine<void, AuthSchema, AuthEvent>(AuthMachineConfig);
