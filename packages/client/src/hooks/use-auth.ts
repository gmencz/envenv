import {
  useWhoAmILazyQuery,
  WhoAmIQueryVariables,
  WhoAmIQuery,
  useLogoutOnClientMutation,
  useLogoutMutation,
  useSignUpMutation,
  SignUpMutationFn,
} from '../generated/graphql';
import { QueryLazyOptions, ApolloError } from '@apollo/client';

interface UseAuthHook {
  whoAmIQuery: {
    execute: (
      options?: QueryLazyOptions<WhoAmIQueryVariables> | undefined
    ) => void;
    result: WhoAmIQuery | undefined;
    onFlight: boolean;
    error: ApolloError | undefined;
  };
  logout: {
    execute: () => void;
    onFlight: boolean;
    error: {
      onClient: ApolloError | undefined;
      onAPI: ApolloError | undefined;
    };
  };
  signup: {
    execute: SignUpMutationFn;
    onFlight: boolean;
    error: ApolloError | undefined;
  };
}

export function useAuth(): UseAuthHook {
  const [
    whoAmI,
    { data: whoAmIResult, loading: whoAmILoadingStatus, error: whoAmIError },
  ] = useWhoAmILazyQuery();

  const [
    logoutOnAPI,
    { loading: logoutOnAPILoadingStatus, error: logoutOnAPIError },
  ] = useLogoutMutation();

  const [
    logoutOnClient,
    { loading: logoutOnClientLoadingStatus, error: logoutOnClientError },
  ] = useLogoutOnClientMutation();

  const [
    signup,
    { loading: signupLoadingStatus, error: signupError },
  ] = useSignUpMutation();

  const logout = () => {
    logoutOnAPI();
    logoutOnClient();
  };

  return {
    whoAmIQuery: {
      execute: whoAmI,
      result: whoAmIResult,
      onFlight: whoAmILoadingStatus,
      error: whoAmIError,
    },
    logout: {
      execute: logout,
      onFlight: logoutOnAPILoadingStatus || logoutOnClientLoadingStatus,
      error: {
        onAPI: logoutOnAPIError,
        onClient: logoutOnClientError,
      },
    },
    signup: {
      execute: signup,
      onFlight: signupLoadingStatus,
      error: signupError,
    },
  };
}
