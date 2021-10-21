import { StateSchema } from 'xstate';

export enum FormStates {
  Editing = 'editing',
  EditingComplete = 'editingComplete',
  Submitting = 'submitting',
  InvalidForm = 'invalidForm',
  ValidationFailed = 'validationFailed',
  Validated = 'validated',
  Blocked = 'blocked'
}

export type FormSchema = StateSchema<any> & {
  states: {
    [FormStates.Editing]: StateSchema<any>;
    [FormStates.EditingComplete]: StateSchema<any>;
    [FormStates.Submitting]: StateSchema<any>;
    [FormStates.InvalidForm]: StateSchema<any>;
    [FormStates.ValidationFailed]: StateSchema<any>;
    [FormStates.Validated]: StateSchema<any>;
    [FormStates.Blocked]: StateSchema<any>;
  };
};
