import { useSelector } from '@xstate/react';
import React, { useContext } from 'react';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';
import { Forgot } from '../forgot/Forgot';
import { Login } from '../login/Login';
import { Register } from '../register/Register';
import { forgotSelector, loginSelector, registerSelector } from './Selectors';

export default function Auth() {
  const { authService } = useContext(AuthenticationContext);

  const login = useSelector(authService, loginSelector);
  const register = useSelector(authService, registerSelector);
  const forgot = useSelector(authService, forgotSelector);

  return login ? <Login /> : register ? <Register /> : forgot ? <Forgot /> : null;
}
