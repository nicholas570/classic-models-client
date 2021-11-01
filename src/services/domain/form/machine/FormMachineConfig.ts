import { MachineConfig } from 'xstate';
import { FormEvent, FormEvents } from '../definition/FormEvents';
import { FormSchema, FormStates } from '../definition/FormSchema';

const onFormUpdate = [
  { target: FormStates.InvalidForm, cond: 'isFormIncomplete', actions: 'onUpdate' },
  { target: FormStates.Editing, actions: 'onUpdate' }
];
export const FormMachineConfig: MachineConfig<any, FormSchema, FormEvents> = {
  id: 'FormMachine',
  initial: FormStates.Initialize,
  states: {
    [FormStates.Initialize]: {
      always: [
        {
          target: FormStates.Fetching,
          cond: 'shouldFetch'
        },
        { target: FormStates.Editing }
      ]
    },
    [FormStates.Fetching]: {
      invoke: {
        src: 'fetchResources',
        onDone: [
          {
            target: FormStates.Editing,
            actions: 'onFetched'
          }
        ]
      }
    },
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
      on: {
        [FormEvent.UpdateForm]: onFormUpdate,
        [FormEvent.Validate]: FormStates.Submitting
      }
    },
    [FormStates.InvalidForm]: {
      entry: 'updateIncomplete',
      exit: 'updateIncomplete',
      always: {
        target: FormStates.EditingComplete,
        cond: 'isFormComplete'
      },
      on: {
        [FormEvent.UpdateForm]: onFormUpdate
      }
    },
    [FormStates.Submitting]: {
      invoke: {
        src: 'submitAsync',
        onDone: [
          {
            target: FormStates.Validated,
            cond: 'isFormValidated',
            actions: 'onValidated'
          }
        ],
        onError: [
          {
            target: FormStates.ValidationFailed,
            actions: 'onFormError'
          }
        ]
      }
    },
    [FormStates.ValidationFailed]: {
      on: {
        [FormEvent.UpdateForm]: onFormUpdate
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
