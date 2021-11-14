import React, { createContext } from 'react';
import { useHistory } from 'react-router';
import { useInterpret } from '@xstate/react';
import { ActorRefFrom } from 'xstate';
import { AuthMachine } from '../../../services/domain/authentication/auth/machine/AuthMachine';

interface AuthenticationContextType {
  authService: ActorRefFrom<typeof AuthMachine>;
}

interface AuthenticationProviderProps {
  children: JSX.Element;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({} as AuthenticationContextType);

export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const history = useHistory();
  const redirect = () => history.push('/home');
  /**
   * To avoid multiple re render using Context Api
   * we provide a static reference to the running machines
   * that change as little as possible.
   * These service should be subscribed in consumers
   */
  const authService = useInterpret(AuthMachine.withContext({ redirect: 3 }), { devTools: true });

  authService.onTransition((listener) => console.debug(`Auth service: ${listener.value}`));

  return <AuthenticationContext.Provider value={{ authService }}>{children}</AuthenticationContext.Provider>;
};
