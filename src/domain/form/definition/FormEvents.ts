export enum FormEvent {
  Validate = 'validate',
  UpdateForm = 'update'
}

export type FormUpdateEvent = { type: FormEvent.UpdateForm; formData: any };

export type FormEvents = FormUpdateEvent | { type: FormEvent.Validate };
