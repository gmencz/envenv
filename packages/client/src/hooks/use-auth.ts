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
  LoginMutation,
  LoginMutationFn,
  useLoginMutation,
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
  login: {
    execute: LoginMutationFn;
    loading: boolean;
    error: ApolloError | undefined;
    data: LoginMutation | null | undefined;
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
    login,
    { loading: loginLoadingStatus, error: loginError, data: loginData },
  ] = useLoginMutation({
    onCompleted: data => {
      if (data.login.__typename === 'SuccessfulLogin') {
        updateClientCacheForAuthentication({
          variables: { csrfToken: data.login.csrfToken },
        });
      }
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
    login: {
      execute: login,
      loading: loginLoadingStatus,
      error: loginError,
      data: loginData,
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
