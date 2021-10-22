import { ActivityConfig, AssignAction, DelayFunctionMap, DoneEventObject, DoneInvokeEvent, MachineOptions, SendAction } from 'xstate';
import { FormEvents } from '../definition/FormEvents';

export interface FormMachineOptions<T> extends MachineOptions<T, FormEvents> {
  guards: {
    isFormComplete: (context: T) => boolean;
    isFormIncomplete: (context: T) => boolean;
    isFormValidated: (context: T, event: DoneEventObject) => boolean;
    shouldBlock: (context: T, event: DoneEventObject) => boolean;
  };
  services: {
    submitAsync: (context: T) => Promise<any>;
  };
  actions: {
    updateIncomplete: AssignAction<T, FormEvents>;
    onUpdate: AssignAction<T, FormEvents>;
    onBlock: AssignAction<T, FormEvents>;
    onFormError: AssignAction<T, FormEvents>;
    onValidated: SendAction<T, any, any> | AssignAction<T, FormEvents>;
  };
  activities: Record<string, ActivityConfig<T, FormEvents>>;
  delays: DelayFunctionMap<T, FormEvents>;
}
