import { StateSchema } from 'xstate';

export enum FormStates {
  Idle = 'idle',
  Editing = 'editing',
  EditingComplete = 'editingComplete',
  Submitting = 'submitting',
  Fetching = 'fetching',
  InvalidForm = 'invalidForm',
  ValidationFailed = 'validationFailed',
  Validated = 'validated',
  Blocked = 'blocked'
}

export type FormSchema = StateSchema<any> & {
  states: {
    [FormStates.Idle]: StateSchema<any>;
    [FormStates.Editing]: StateSchema<any>;
    [FormStates.EditingComplete]: StateSchema<any>;
    [FormStates.Submitting]: StateSchema<any>;
    [FormStates.Fetching]: StateSchema<any>;
    [FormStates.InvalidForm]: StateSchema<any>;
    [FormStates.ValidationFailed]: StateSchema<any>;
    [FormStates.Validated]: StateSchema<any>;
    [FormStates.Blocked]: StateSchema<any>;
  };
};
