import React from 'react';

interface UseUnexpectedTypenameHook {
  failedOperationMessage: string;
  failedOperationTypename: string;
}

export function useUnexpectedTypename(
  operationData: any,
  expectedOperationTypename: string
): UseUnexpectedTypenameHook {
  const [failedOperationInfo, setFailedOperationInfo] = React.useState({
    message: '',
    typename: '',
  });

  React.useEffect(() => {
    if (operationData) {
      const [operationName] = Object.keys(operationData).filter(
        key => key !== '__typename'
      );

      if (
        operationData[operationName].__typename !== expectedOperationTypename
      ) {
        setFailedOperationInfo({
          message: operationData[operationName].message,
          typename: operationData[operationName].__typename,
        });
      }
    }
  }, [operationData, expectedOperationTypename]);

  return {
    failedOperationMessage: failedOperationInfo.message,
    failedOperationTypename: failedOperationInfo.typename,
  };
}
