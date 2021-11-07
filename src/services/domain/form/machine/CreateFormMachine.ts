import { Machine } from 'xstate';
import { FormEvents } from '../definition/FormEvents';
import { FormSchema } from '../definition/FormSchema';
import { FormMachineConfig } from './FormMachineConfig';
import { FormMachineOptions } from './FormMachineOptions';

export const createFormMachine = <T>(options: FormMachineOptions<T>) => {
  return Machine<T, FormSchema, FormEvents>(FormMachineConfig, options);
};
