import React, { useMemo } from 'react';
import { useQueryParams } from '../../../hooks/use-query-params';
import { Redirect } from 'react-router-dom';

export const AuthFlowLastStep: React.FC = () => {
  const params = useQueryParams();

  const fieldsToFill = useMemo(() => {
    const fields = params.get('fill');
    if (!fields) {
      return null;
    }

    return fields.split(',');
  }, [params]);

  if (!fieldsToFill) {
    return <Redirect to='/' />;
  }

  return <p>Heyyyy</p>;
};
