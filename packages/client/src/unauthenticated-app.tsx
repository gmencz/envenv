import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SignupScreen } from './screens/auth/signup';
import { LoginScreen } from './screens/auth/login';
import { SignupLastStepScreen } from './screens/auth/signup/lastStep';
import {
  AuthScreenContainer,
  AuthScreenHero,
  AuthScreenInfoOuterContainer,
} from './screens/auth/styles';

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
    <Route path='/auth/signup' exact>
      <AuthScreenContainer>
        <AuthScreenInfoOuterContainer>
          <SignupScreen />
        </AuthScreenInfoOuterContainer>
        <AuthScreenHero />
      </AuthScreenContainer>
    </Route>
    <Route path='/auth/signup/lastStep'>
      <AuthScreenContainer>
        <AuthScreenInfoOuterContainer isLastStep>
          <SignupLastStepScreen />
        </AuthScreenInfoOuterContainer>
        <AuthScreenHero />
      </AuthScreenContainer>
    </Route>
    <Route path='*'>
      <p>not found</p>
    </Route>
  </Switch>
);

export default UnauthenticatedApp;
