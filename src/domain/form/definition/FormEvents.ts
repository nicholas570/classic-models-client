export enum FormEvent {
  Validate = 'validate',
  UpdateForm = 'update'
}
export type FormEvents =
  | { type: FormEvent.UpdateForm; formData: any }
  | { type: FormEvent.Validate };
