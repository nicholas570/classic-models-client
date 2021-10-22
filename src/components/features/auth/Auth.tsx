import { useSelector } from '@xstate/react';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';
import { Forgot } from '../forgot/Forgot';
import { Login } from '../login/Login';
import { Register } from '../register/Register';
import { forgotSelector, isAuthenticatedSelector, loginSelector, registerSelector } from './Selectors';

export default function Auth() {
  const { authService } = useContext(AuthenticationContext);
  const history = useHistory();

  const login = useSelector(authService, loginSelector);
  const register = useSelector(authService, registerSelector);
  const forgot = useSelector(authService, forgotSelector);
  const isAuthenticated = useSelector(authService, isAuthenticatedSelector);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        history.push('/home');
      }, 500);
    }
  }, [isAuthenticated]);

  return login ? <Login /> : register ? <Register /> : forgot ? <Forgot /> : null;
}
