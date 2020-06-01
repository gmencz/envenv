import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SignupScreen } from './screens/auth/register';
import { LoginScreen } from './screens/auth/login';
import { SignupLastStepScreen } from './screens/auth/register/lastStep';
import {
  AuthScreenContainer,
  AuthScreenHero,
  AuthScreenInfoOuterContainer,
} from './screens/auth/styles';
import { AuthFlowSuccess } from './screens/auth/flow/success';
import { AuthFlowLastStep } from './screens/auth/flow/lastStep';

const UnauthenticatedApp: React.FC = () => <Routes />;

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact>
      <AuthScreenContainer>
        <AuthScreenInfoOuterContainer>
          <SignupScreen />
        </AuthScreenInfoOuterContainer>
        <AuthScreenHero />
      </AuthScreenContainer>
    </Route>
    <Route path='/signup'>
      <Redirect to='/register' />
    </Route>
    <Route path='/login'>
      <LoginScreen />
    </Route>
    <Route path='/register'>
      <AuthScreenContainer>
        <AuthScreenInfoOuterContainer centerOnSmHeights fullScreenOnSm>
          <SignupLastStepScreen />
        </AuthScreenInfoOuterContainer>
        <AuthScreenHero />
      </AuthScreenContainer>
    </Route>
    <Route path='/auth/flow/success' exact>
      <AuthFlowSuccess />
    </Route>
    <Route path='/auth/flow/success/lastStep' exact>
      <AuthFlowLastStep />
    </Route>
    <Route path='*'>
      <p>not found</p>
    </Route>
  </Switch>
);

export default UnauthenticatedApp;
