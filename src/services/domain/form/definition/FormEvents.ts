import { AxiosErrorResponse, ResponseContent } from '../../../../models/api/response';

export enum FormEvent {
  Validate = 'validate',
  UpdateForm = 'update'
}

export type FormUpdateEvent = { type: FormEvent.UpdateForm; formData: any };
export type FormValidateEvent = { type: FormEvent.Validate; data?: any };
export type FormErrorEvent = { type: any; data: AxiosErrorResponse<ResponseContent<any>> };

export type FormEvents = FormUpdateEvent | FormValidateEvent | FormErrorEvent;
