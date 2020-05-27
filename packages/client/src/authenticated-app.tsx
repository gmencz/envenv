import React, { useEffect, useRef } from 'react';
import {
  useWhoAmILazyQuery,
  useLogoutOnClientMutation,
  useLogoutMutation,
} from './generated/graphql';
import { FullpageLoader } from './components/fullpage-loader';
import { Redirect } from 'react-router-dom';

const AuthenticatedApp: React.FC = () => {
  // Using lazy query because @apollo/client v3.0.0-beta.50
  // does not abort the query if the component has unmounted
  // due to a bug and this can cause memory leaks.
  // Once that^ is solved we can useQuery instead.
  const [whoAmI, { data, loading, error }] = useWhoAmILazyQuery();
  const [logoutOnClient] = useLogoutOnClientMutation();
  const [logoutOnAPI] = useLogoutMutation();

  // Hacky fix for explained bug above.
  const mounted = useRef(true);
  useEffect(() => {
    if (mounted.current) {
      whoAmI();
    }
    return () => {
      mounted.current = false;
    };
  }, [whoAmI]);

  if (loading) {
    return <FullpageLoader />;
  }

  if (error) {
    localStorage.removeItem('csrf-token');
    logoutOnClient();
    logoutOnAPI();
    return <Redirect to='/auth/login' />;
  }

  return <h1>Hey, {data?.me.name}! 🚀</h1>;
};

export default AuthenticatedApp;
