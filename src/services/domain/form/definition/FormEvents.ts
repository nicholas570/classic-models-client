import { AxiosErrorResponse, ResponseContent } from '../../../../models/api/response';

export enum FormEvent {
  VALIDATE = 'VALIDATE',
  UPDATE_FORM = 'UPDATE_FORM'
}

export type FormUpdateEvent = { type: FormEvent.UPDATE_FORM; formData: any };
export type FormValidateEvent = { type: FormEvent.VALIDATE; data?: any };
export type FormErrorEvent = { type: any; data: AxiosErrorResponse<ResponseContent<any>> };

export type FormEvents = FormUpdateEvent | FormValidateEvent | FormErrorEvent;
