import { useActor, useSelector } from '@xstate/react';
import React, { useContext } from 'react';
import { AuthStates } from '../../../domain/auth/definition/AuthSchema';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';
import { Login } from '../login/Login';
import { Register } from '../register/Register';
import { forgotSelector, loginSelector, registerSelector } from './Selectors';

export default function Auth() {
  const { authService } = useContext(AuthenticationContext);

  const login = useSelector(authService, loginSelector);
  const register = useSelector(authService, registerSelector);
  const forgot = useSelector(authService, forgotSelector);

  return login ? <Login /> : register ? <Register /> : forgot ? <div>Forgot form</div> : null;
}
