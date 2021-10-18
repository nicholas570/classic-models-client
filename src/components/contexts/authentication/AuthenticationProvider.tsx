import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { ActorRefFrom } from 'xstate';
import { AuthMachine } from '../../../domain/auth/machine/AuthMachine';
import { LoginMachine } from '../../../domain/login/machine/LoginMachine';
import { RegisterMachine } from '../../../domain/register/machine/RegisterMachine';

interface AuthenticationContextType {
  authService: ActorRefFrom<typeof AuthMachine>;
  loginService: ActorRefFrom<typeof LoginMachine>;
  registerService: ActorRefFrom<typeof RegisterMachine>;
}

interface AuthenticationProviderProps {
  children: JSX.Element;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({} as AuthenticationContextType);

export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const authService = useInterpret(AuthMachine);
  const loginService = useInterpret(LoginMachine);
  const registerService = useInterpret(RegisterMachine);

  authService.onTransition((listener) => console.debug(`Auth service: ${listener.value}`));
  registerService.onTransition((listener) => console.debug(`Register service: ${listener.value}`));

  return <AuthenticationContext.Provider value={{ authService, loginService, registerService }}>{children}</AuthenticationContext.Provider>;
};
