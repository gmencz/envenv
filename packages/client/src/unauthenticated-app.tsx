import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { SignupScreen } from './screens/auth/signup';
import { LoginScreen } from './screens/auth/login';
import { HomeScreen } from './screens/home';

const UnauthenticatedApp: React.FC = () => {
  return (
    <>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
      <Routes />
    </>
  );
};

const Routes: React.FC = () => (
  <Switch>
    {/* <Route path='/'>
      <HomeScreen />
    </Route> */}
    <Route path='/login'>
      <LoginScreen />
    </Route>
    <Route path='/signup'>
      <SignupScreen />
    </Route>
  </Switch>
);

export default UnauthenticatedApp;
