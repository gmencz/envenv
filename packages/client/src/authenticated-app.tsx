import React from 'react';
import { FullpageLoader } from './components/fullpage-loader';
import { Redirect, Switch, Route } from 'react-router-dom';
import { useAuth } from './hooks/use-auth';
import { HomeScreen } from './screens/home';
import { Navbar } from './components/navbar';
import styled from 'styled-components';

const StyledContent = styled.main`
  margin-top: 120px;
  max-width: 1056px;
  margin: 120px auto;
`;

const AuthenticatedApp: React.FC = () => {
  // Using lazy query because @apollo/client v3.0.0-beta.50
  // does not abort the query if the component has unmounted
  // due to a bug and this can cause memory leaks.
  // Once that^ is solved we can useQuery instead.
  const { logout, whoAmI } = useAuth();

  // Hacky fix for explained bug above.
  const mounted = React.useRef(true);
  React.useEffect(() => {
    if (mounted.current) {
      whoAmI.execute();
    }
    return () => {
      mounted.current = false;
    };
  }, [whoAmI]);

  if (whoAmI.loading) {
    return <FullpageLoader />;
  }

  if (whoAmI.error && whoAmI.error.graphQLErrors.length > 0) {
    logout.execute();
    return <Redirect to='/' />;
  }

  return (
    <>
      <Navbar picture={whoAmI.data?.me.picture || ''} />
      <StyledContent>
        <Routes />
      </StyledContent>
    </>
  );
};

const Routes: React.FC = () => (
  <Switch>
    <Route exact path='/'>
      <HomeScreen />
    </Route>
    <Route path='/auth/flow/success'>
      <Redirect to='/' />
    </Route>
  </Switch>
);

export default AuthenticatedApp;
