import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SignupScreen } from './screens/auth/signup';
import { LoginScreen } from './screens/auth/login';

const UnauthenticatedApp: React.FC = () => <Routes />;

const Routes: React.FC = () => (
  <Switch>
    <Route exact path='/'>
      <p>Some marketing stuff</p>
    </Route>
    <Route path='/login'>
      <Redirect to='/auth/login' />
    </Route>
    <Route path='/signup'>
      <Redirect to='/auth/signup' />
    </Route>
    <Route path='/auth/login'>
      <LoginScreen />
    </Route>
    <Route path='/auth/signup'>
      <SignupScreen />
    </Route>
    <Route path='*'>
      <p>not found</p>
    </Route>
  </Switch>
);

export default UnauthenticatedApp;
