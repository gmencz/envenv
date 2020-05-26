import React from 'react';
import { FullpageLoader } from './components/fullpage-loader';
import { useQuery } from '@apollo/client';
import { WhoAmI } from './generated/WhoAmI';
import { ME } from './graphql/user/me';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

const App: React.FC = () => {
  const { data, loading } = useQuery<WhoAmI>(ME);

  if (loading) {
    return <FullpageLoader />;
  }

  return (
    <React.Suspense fallback={<FullpageLoader />}>
      {data?.me ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export { App };
