import React from 'react';
import { useAuth } from '../../../hooks/use-auth';
import { useQueryParams } from '../../../hooks/use-query-params';
import { isValid } from 'shortid';

interface AuthFlowSuccessProps {}

export const AuthFlowSuccess: React.FC<AuthFlowSuccessProps> = () => {
  const { updateClientCacheForUserLogin, logout } = useAuth();
  const params = useQueryParams();
  const csrfToken = params.get('csrfToken');

  React.useEffect(() => {
    if (!csrfToken || !isValid(csrfToken)) {
      logout.execute();
    } else {
      updateClientCacheForUserLogin.execute({
        variables: { csrfToken },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
