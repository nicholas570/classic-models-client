import { useActor } from '@xstate/react';
import React, { useContext } from 'react';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';

export const Home = () => {
  const { authService } = useContext(AuthenticationContext);
  const [authState, sendToAuthService] = useActor(authService);
  // fetch user with authState token
  return <div>Welcome home</div>;
};
