import {
  useWhoAmILazyQuery,
  WhoAmIQueryVariables,
  WhoAmIQuery,
  useLogoutOnClientMutation,
  useLogoutMutation,
  useSignUpMutation,
  SignUpMutationFn,
  useLoginOnClientMutation,
  SignUpMutation,
  LoginOnClientMutationFn,
} from '../generated/graphql';
import {
  QueryLazyOptions,
  ApolloError,
  NetworkStatus,
  useApolloClient,
} from '@apollo/client';

interface UseAuthHook {
  whoAmI: {
    execute: (
      options?: QueryLazyOptions<WhoAmIQueryVariables> | undefined
    ) => void;
    data: WhoAmIQuery | undefined;
    loading: boolean;
    error: ApolloError | undefined;
    networkStatus: NetworkStatus;
    called: boolean;
  };
  logout: {
    execute: () => void;
    loading: boolean;
    error: {
      onClient: ApolloError | undefined;
      onAPI: ApolloError | undefined;
    };
  };
  signup: {
    execute: SignUpMutationFn;
    loading: boolean;
    error: ApolloError | undefined;
    data: SignUpMutation | null | undefined;
  };
  updateClientCacheForUserLogin: {
    execute: LoginOnClientMutationFn;
    loading: boolean;
  };
}

export function useAuth(): UseAuthHook {
  const client = useApolloClient();

  const [
    whoAmI,
    {
      data: whoAmIResult,
      loading: whoAmILoadingStatus,
      error: whoAmIError,
      networkStatus: whoAmINetworkStatus,
      called: whoAmICalled,
    },
  ] = useWhoAmILazyQuery();

  const [
    updateClientCacheForAuthentication,
    { loading: updateClientCacheForAuthenticationLoading },
  ] = useLoginOnClientMutation();

  const [
    logoutOnAPI,
    { loading: logoutOnAPILoadingStatus, error: logoutOnAPIError },
  ] = useLogoutMutation({
    onCompleted: () => {
      logoutOnClient();
    },
  });

  const [
    logoutOnClient,
    { loading: logoutOnClientLoadingStatus, error: logoutOnClientError },
  ] = useLogoutOnClientMutation({
    onCompleted: async () => {
      await client.resetStore();
    },
  });

  const [
    signup,
    { loading: signupLoadingStatus, error: signupError, data: signupData },
  ] = useSignUpMutation({
    onCompleted: data => {
      if (data.signup.__typename === 'SuccessfulSignup') {
        updateClientCacheForAuthentication({
          variables: { csrfToken: data.signup.csrfToken },
        });
      }
    },
  });

  return {
    whoAmI: {
      execute: whoAmI,
      data: whoAmIResult,
      loading: whoAmILoadingStatus,
      error: whoAmIError,
      networkStatus: whoAmINetworkStatus,
      called: whoAmICalled,
    },
    logout: {
      execute: logoutOnAPI,
      loading: logoutOnAPILoadingStatus || logoutOnClientLoadingStatus,
      error: {
        onAPI: logoutOnAPIError,
        onClient: logoutOnClientError,
      },
    },
    signup: {
      execute: signup,
      loading: signupLoadingStatus,
      error: signupError,
      data: signupData,
    },
    updateClientCacheForUserLogin: {
      execute: updateClientCacheForAuthentication,
      loading: updateClientCacheForAuthenticationLoading,
    },
  };
}
