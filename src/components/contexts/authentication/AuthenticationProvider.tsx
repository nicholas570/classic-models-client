import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { ActorRefFrom, Interpreter } from 'xstate';
import { AuthEvent } from '../../../domain/auth/definition/AuthEvents';
import { AuthSchema } from '../../../domain/auth/definition/AuthSchema';
import { FormEvents } from '../../../domain/form/definition/FormEvents';
import { FormSchema } from '../../../domain/form/definition/FormSchema';
import { LoginContext } from '../../../domain/login/definition/LoginContext';
import { RegisterContext } from '../../../domain/register/definition/RegisterContext';
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

  return <AuthenticationContext.Provider value={{ authService, loginService, registerService }}>{children}</AuthenticationContext.Provider>;
};
