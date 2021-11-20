import { get, isEmpty, every } from 'lodash';
import { assign, DoneEventObject, DoneInvokeEvent, sendParent } from 'xstate';
import { Employee } from '../../../../../models/api/employee';
import { Office } from '../../../../../models/api/offices';
import { ErrorResponse, ResponseContent } from '../../../../../models/api/response';
import { toOfficeCode } from '../../../../../models/utils/mapper';
import { getOfficesAsync } from '../../../../api/getOffices';
import { registerAsync } from '../../../../api/register';
import { FormErrorEvent, FormEvent, FormEvents, FormUpdateEvent } from '../../../form/definition/FormEvents';
import { FormMachineOptions } from '../../../form/machine/FormMachineOptions';
import { RegisterContext, RegisterErrors } from '../definition/RegisterContext';

export const isComplete = (context: RegisterContext): boolean => {
  const { employee } = context;
  const formValues = [
    employee.lastName,
    employee.firstName,
    employee.extension,
    employee.email,
    employee.officeCode,
    employee.jobTitle,
    employee.password
  ];
  return every(formValues, (value) => !isEmpty(value)) && (employee.password?.length ?? 0) >= 3;
};

export const RegisterMachineOptions: FormMachineOptions<RegisterContext> = {
  guards: {
    shouldFetch: (context: RegisterContext) => true,
    isFormComplete: (context: RegisterContext) => isComplete(context),
    isFormIncomplete: (context: RegisterContext) => !isComplete(context),
    isFormValidated: (context: RegisterContext, event: DoneEventObject) => !!(event as DoneInvokeEvent<Employee>).data,
    shouldBlock: (context: RegisterContext) => true
  },
  services: {
    fetchResources: async (context: RegisterContext): Promise<Office[]> => {
      const { payload } = await getOfficesAsync(context.apiClient);
      return payload;
    },
    submitAsync: async (context: RegisterContext): Promise<any> => {
      const { payload } = await registerAsync(context.apiClient, context.employee);
      return payload;
    }
  },
  actions: {
    onFetched: assign({
      offices: (context, event: DoneInvokeEvent<Office[]>) => {
        return toOfficeCode(event.data);
      }
    }),
    onUpdate: assign((context: RegisterContext, event: FormEvents) => {
      const { formData } = event as FormUpdateEvent;
      return {
        ...context,
        employee: { ...context.employee, ...formData },
        errors: undefined
      };
    }),
    updateIncomplete: assign((context: RegisterContext, event: FormEvents) => {
      const errors: RegisterErrors = {};
      const { employee } = context;

      const lastName = get(event, 'formData.lastName', employee.lastName);
      const firstName = get(event, 'formData.firstName', employee.firstName);
      const extension = get(event, 'formData.extension', employee.extension);
      const email = get(event, 'formData.email', employee.email);
      const officeCode = get(event, 'formData.officeCode', employee.officeCode);
      const jobTitle = get(event, 'formData.jobTitle', employee.jobTitle);
      const password = get(event, 'formData.password', employee.password);

      if (isEmpty(lastName)) {
        errors.lastName = 'Fill-in your last name';
      }
      if (isEmpty(firstName)) {
        errors.firstName = 'Fill-in your first name';
      }
      if (isEmpty(extension)) {
        errors.extension = 'Fill-in your employee extension';
      }
      if (isEmpty(email)) {
        errors.email = 'Fill-in your email';
      }
      if (isEmpty(officeCode)) {
        errors.officeCode = 'Fill-in your employee office code';
      }
      if (isEmpty(jobTitle)) {
        errors.jobTitle = 'Fill-in your employee job title';
      }
      if (isEmpty(password)) {
        errors.password = 'Fill-in your Password';
      } else if (password.length < 3) {
        errors.password = 'Password is too short :)';
      }
      return {
        ...context,
        errors
      };
    }),
    onValidated: sendParent({ type: FormEvent.Validate }),
    onFormError: assign({
      errors: (context, event) => {
        const { data: eventData } = event as FormErrorEvent;
        const { payload } = eventData.response.data as ResponseContent<ErrorResponse>;
        const { message } = payload;
        return { message };
      }
    }),
    onBlock: assign((context: RegisterContext, event: FormEvents) => context)
  },
  activities: {},
  delays: {}
};
