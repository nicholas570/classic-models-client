import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from '../features/auth/Auth';
import { Home } from '../features/home/Home';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
