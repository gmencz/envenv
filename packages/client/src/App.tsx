import React from 'react';
import { FullpageLoader } from './components/fullpage-loader';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

const App: React.FC = () => {
  const user = true;

  return (
    <React.Suspense fallback={<FullpageLoader />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export { App };
