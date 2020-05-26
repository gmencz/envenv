import React from 'react';
import { FullpageLoader } from './components/fullpage-loader';
import { useQuery } from '@apollo/client';
import { ME } from './graphql/user/me';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

const App: React.FC = () => {
  const { data } = useQuery(ME);

  return (
    <React.Suspense fallback={<FullpageLoader />}>
      {data?.me ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export { App };
