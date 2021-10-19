import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { ActorRefFrom } from 'xstate';
import { AuthMachine } from '../../../domain/auth/machine/AuthMachine';
import { LoginMachine } from '../../../domain/login/machine/LoginMachine';
import { RegisterMachine } from '../../../domain/register/machine/RegisterMachine';

interface AuthenticationContextType {
  authService: ActorRefFrom<typeof AuthMachine>;
  registerService: ActorRefFrom<typeof RegisterMachine>;
}

interface AuthenticationProviderProps {
  children: JSX.Element;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({} as AuthenticationContextType);

export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  /**
   * To avoid multiple re render using Context Api
   * we provide a static reference to the running machines
   * that change as little as possible.
   * These service should be subscribed in consumers
   */
  const authService = useInterpret(AuthMachine);
  const registerService = useInterpret(RegisterMachine);

  authService.onTransition((listener) => console.debug(`Auth service: ${listener.value}`));
  registerService.onTransition((listener) => console.debug(`Register service: ${listener.value}`));

  return <AuthenticationContext.Provider value={{ authService, registerService }}>{children}</AuthenticationContext.Provider>;
};
