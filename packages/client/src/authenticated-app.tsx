import React from 'react';
import { FullpageLoader } from './components/fullpage-loader';
import { Redirect, Switch, Route } from 'react-router-dom';
import { useAuth } from './hooks/use-auth';

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

  if (whoAmI.error) {
    logout.execute();
    return <Redirect to='/' />;
  }

  return <Routes />;
};

const Routes: React.FC = () => (
  <Switch>
    <Route path='/auth/flow/success'>
      <Redirect to='/' />
    </Route>
  </Switch>
);

export default AuthenticatedApp;
