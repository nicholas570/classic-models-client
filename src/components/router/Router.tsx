import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthenticationProvider } from '../contexts/authentication/AuthenticationProvider';
import Auth from '../features/auth/Auth';
import { Home } from '../features/home/Home';

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/home" component={Home} />
        </Switch>
      </AuthenticationProvider>
    </BrowserRouter>
  );
};
