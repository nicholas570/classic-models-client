import { useActor } from '@xstate/react';
import React, { useContext } from 'react';
import { AuthStates } from '../../../domain/auth/definition/AuthSchema';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';
import { Login } from '../login/Login';
import { Register } from '../register/Register';

export default function Auth() {
  const { authService } = useContext(AuthenticationContext);
  const [authState] = useActor(authService);

  return authState.matches(AuthStates.SignIn) ? (
    <Login />
  ) : authState.matches(AuthStates.Register) ? (
    <Register />
  ) : authState.matches(AuthStates.Forgot) ? (
    <div>Forgot form</div>
  ) : null;
}
