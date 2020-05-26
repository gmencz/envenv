import React from 'react';
import { FullpageLoader } from './components/fullpage-loader';
import { gql, useQuery } from '@apollo/client';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

export const CHECK_AUTH = gql`
  query CheckAuth {
    isLoggedIn @client
  }
`;

const App: React.FC = () => {
  const { data: auth } = useQuery(CHECK_AUTH);

  return (
    <React.Suspense fallback={<FullpageLoader />}>
      {auth?.isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export { App };
