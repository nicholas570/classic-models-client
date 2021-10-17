import React from 'react';
import { AuthenticationProvider } from './components/contexts/authentication/AuthenticationProvider';
import { Router } from './components/router/Router';

export const App = () => {
  return (
    <AuthenticationProvider>
      <Router />
    </AuthenticationProvider>
  );
};
