import React from 'react';
import { FullpageLoader } from './components/fullpage-loader';
import { Redirect, Switch, Route } from 'react-router-dom';
import { useAuth } from './hooks/use-auth';
// import { HomeScreen } from './screens/home';
import { GettingStarted } from './screens/getting-started';
import { Navbar } from './components/navbar';
import styled from 'styled-components';
import { MainSidebar } from './components/main-sidebar';

const StyledContent = styled.main`
  h1 {
    margin: 0;
  }
`;

const StyledMainWrapper = styled.div`
  margin-top: 120px;
  max-width: 1056px;
  margin: 0 auto;
  padding: 160px 1.5rem;
  display: flex;
`;

const StyledAppWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.dark.background};
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

  if (whoAmI.loading || mounted.current) {
    return <FullpageLoader />;
  }

  if (whoAmI.error && whoAmI.error.graphQLErrors.length > 0) {
    logout.execute();
    return <Redirect to='/' />;
  }

  return (
    <StyledAppWrapper>
      <Navbar picture={whoAmI.data?.me.picture} />
      <StyledMainWrapper>
        <MainSidebar />
        <StyledContent>
          <Routes />
        </StyledContent>
      </StyledMainWrapper>
    </StyledAppWrapper>
  );
};

const Routes: React.FC = () => (
  <Switch>
    <Route exact path='/'>
      <Redirect to='/gettingStarted' />
    </Route>
    <Route exact path='/gettingStarted'>
      <GettingStarted />
    </Route>
    <Route path='/auth/flow/success'>
      <Redirect to='/' />
    </Route>
  </Switch>
);

export default AuthenticatedApp;
