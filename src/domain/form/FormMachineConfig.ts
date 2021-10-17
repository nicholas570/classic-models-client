import { MachineConfig } from 'xstate';
import { FormEvent, FormEvents } from './definition/FormEvents';
import { FormSchema, FormStates } from './definition/FormSchema';

const onFormUpdate = { target: FormStates.Editing, actions: 'onUpdate' };
export const FormMachineConfig: MachineConfig<any, FormSchema, FormEvents> = {
  id: 'formMachine',
  initial: FormStates.Editing,
  states: {
    [FormStates.Editing]: {
      always: [
        {
          target: FormStates.EditingComplete,
          cond: 'isFormComplete'
        }
      ],
      on: {
        [FormEvent.UpdateForm]: onFormUpdate
      }
    },
    [FormStates.EditingComplete]: {
      // always: [
      //     { target: FormStates.InvalidForm, cond: 'isFormIncomplete', actions: 'updateError' },
      // ],
      on: {
        [FormEvent.UpdateForm]: onFormUpdate,
        [FormEvent.Validate]: FormStates.Submitting
      }
    },
    [FormStates.Submitting]: {
      invoke: {
        src: 'submitAsync',
        onError: [
          {
            target: FormStates.Blocked,
            cond: 'shouldBlock',
            actions: 'onBlock'
          }
        ],
        onDone: [
          {
            target: FormStates.Validated,
            cond: 'isFormValidated',
            actions: 'onValidated'
          },
          {
            target: FormStates.ValidationFailed,
            actions: 'onFormError'
          }
        ]
      }
    },
    [FormStates.InvalidForm]: {
      entry: ['updateIncomplete'],
      exit: ['updateIncomplete'],
      on: {
        [FormEvent.UpdateForm]: onFormUpdate
      }
    },
    [FormStates.ValidationFailed]: {
      on: {
        [FormEvent.UpdateForm]: onFormUpdate,
        [FormEvent.Validate]: FormStates.Submitting
      }
    },
    [FormStates.Validated]: {
      type: 'final'
    },
    [FormStates.Blocked]: {
      type: 'final'
    }
  }
};
