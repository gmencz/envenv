import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Byte: any;
  Currency: any;
  DateTime: Date;
  EmailAddress: any;
  GUID: any;
  HexColorCode: any;
  HSL: any;
  HSLA: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  JSON: any;
  JSONObject: any;
  Long: any;
  MAC: any;
  NegativeFloat: any;
  NegativeInt: any;
  NonNegativeFloat: any;
  NonNegativeInt: any;
  NonPositiveFloat: any;
  NonPositiveInt: any;
  ObjectID: any;
  PhoneNumber: any;
  Port: any;
  PositiveFloat: any;
  PositiveInt: any;
  PostalCode: any;
  RGB: any;
  RGBA: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  URL: any;
  USCurrency: any;
  UtcOffset: any;
};

/** The data required to create an environment. */
export type CreateEnvironmentInput = {
  /** The name of the environment. */
  name: Scalars['String'];
  /** The id of the user creating the environment. */
  userCreatingEnvironmentId: Scalars['ID'];
};

/**
 * An environment is an Envenv project owned by a user which contains the remote
 * (Github, BitBucket, etc) non-production project secrets.
 */
export type Environment = {
  __typename?: 'Environment';
  /** The unique id of the environment. */
  id: Scalars['ID'];
  /** The name of the environment. */
  name: Scalars['String'];
  /** The owner of the environment. */
  owner: User;
  /** The members of the environment. */
  members?: Maybe<Array<Maybe<EnvironmentMember>>>;
};

/** En environment member is a user who's part of an environment with specific rights. */
export type EnvironmentMember = {
  __typename?: 'EnvironmentMember';
  /** The unique id of the environment member. */
  id: Scalars['ID'];
  /** The environment to which the environment member belongs. */
  environment?: Maybe<Environment>;
  /** The role the environment member has. */
  environmentRole?: Maybe<EnvironmentRole>;
  /** The user which is the environment member. */
  user: User;
};

/**
 * Represents the roles an environment member can have,
 * it describes which rights an environment member
 * has on an environment.
 */
export enum EnvironmentRole {
  /**
   * Environment member has admin rights on the environment such as:
   * Promoting other environment members.
   * Removing environment members from the environment.
   */
  Admin = 'ADMIN',
  /**
   * Environment member has basic rights on the environment such as:
   * Contributing to the environment.
   * Commenting on the environment chat.
   * This is the default role for an environment member.
   */
  Contributor = 'CONTRIBUTOR',
}

/** The possible providers of a user's account. */
export enum AccountProvider {
  /** The user provided their account details via github. */
  Github = 'GITHUB',
  /** The user provided their own account details to use exclusively on Envenv. */
  None = 'NONE',
}

/** The data required to create a new user. */
export type CreateUserInput = {
  /**
   * The ID of the new user, this is useful if we want to sign up
   * with Github or some other provider, if not specified a unique id
   * will be generated.
   */
  id?: Maybe<Scalars['ID']>;
  /** The URL of the new user's picture/profile picture. */
  picture?: Maybe<Scalars['URL']>;
  /** The username of the new user. */
  username: Scalars['String'];
  /** The email of the new user. */
  email: Scalars['EmailAddress'];
  /** The name of the new user. */
  name: Scalars['String'];
  /** The plain password of the new user. */
  password: Scalars['String'];
};

/** Represents the result of an operation which deletes all users. */
export type DeleteAllUsersResult = NotInTestingEnvironment | SuccessfulRemoval;

/** Represents the result of an operation in which the email may have been sent or not depending on the email's validity. */
export type EmailMayHaveBeenSent = {
  __typename?: 'EmailMayHaveBeenSent';
  /** A detailed explanation of why the email may or may not have been sent. */
  message: Scalars['String'];
};

/** Represents the result of an operation in which the provided credentials were invalid. */
export type InvalidCredentials = {
  __typename?: 'InvalidCredentials';
  /** A detailed explanation of why the credentials were invalid. */
  message: Scalars['String'];
};

/**
 * Represents the result of an operation in which the provided data did not meet
 * Envenv's security requirements or overall data requirements.
 */
export type InvalidDataFormat = {
  __typename?: 'InvalidDataFormat';
  /** A detailed explanation of why the data was invalid and which piece of the data caused the issue. */
  message: Scalars['String'];
};

/** Represents the result of an operation in which the provided token was invalid or expired. */
export type InvalidOrExpiredToken = {
  __typename?: 'InvalidOrExpiredToken';
  /** A detailed explanation of why the token was invalid or expired. */
  message: Scalars['String'];
};

/** Represents the result of an operation which logs a user in. */
export type LoginResult =
  | SuccessfulLogin
  | InvalidDataFormat
  | InvalidCredentials;

export type LogoutResult = NoCurrentSession | SuccessfulLogout;

/**
 * Represents the result of an operation in which the session
 * was attempted to terminate but there was no session to
 * terminate or it had already expired.
 */
export type NoCurrentSession = {
  __typename?: 'NoCurrentSession';
  /** A detailed explanation of what happened. */
  message: Scalars['String'];
};

/** Represents the result of a testing-only operation which was attempted to be executed on a non-testing environment. */
export type NotInTestingEnvironment = {
  __typename?: 'NotInTestingEnvironment';
  /** A detailed explanation of why the operation could not be executed in the attempted environment. */
  message: Scalars['String'];
};

/** Represents the result of an operation in which the provided password did not match the current one. */
export type PasswordsDontMatch = {
  __typename?: 'PasswordsDontMatch';
  /** A detailed explanation of why the passwords did not match. */
  message: Scalars['String'];
};

/** Represents the result of an operation which requests an email with the instructions to reset an account's password. */
export type RequestPasswordResetEmailPayload =
  | EmailMayHaveBeenSent
  | InvalidDataFormat;

/** The data required to reset an account's password. */
export type ResetPasswordInput = {
  /** The current password. */
  currentPassword: Scalars['String'];
  /** The new password. */
  newPassword: Scalars['String'];
  /** The token needed to reset the password. */
  token: Scalars['String'];
};

/** Represents the result of an operation which resets an account's password. */
export type ResetPasswordResult =
  | User
  | InvalidOrExpiredToken
  | PasswordsDontMatch
  | WantsSamePassword
  | InvalidDataFormat;

/** Represents the result of an operation which signs a user up. */
export type SignupResult =
  | SuccessfulSignup
  | InvalidDataFormat
  | TakenUsernameOrEmail;

/** Represents a successful login. */
export type SuccessfulLogin = {
  __typename?: 'SuccessfulLogin';
  /** The user who logged in. */
  user: User;
  /** The CSRF token for the started session. */
  csrfToken: Scalars['String'];
};

/** Represents the result of a successful logout. */
export type SuccessfulLogout = {
  __typename?: 'SuccessfulLogout';
  /** The time at which the logout was performed. */
  performedAt: Scalars['DateTime'];
};

/** Represents the successful removal of a resource. */
export type SuccessfulRemoval = {
  __typename?: 'SuccessfulRemoval';
  /** The amount of resources removed. */
  count: Scalars['PositiveInt'];
};

/** Represents a successful user signup. */
export type SuccessfulSignup = {
  __typename?: 'SuccessfulSignup';
  user: User;
  /** The CSRF token for the started session. */
  csrfToken: Scalars['String'];
};

/** Represents the result of an operation in which the provided username or email are taken. */
export type TakenUsernameOrEmail = {
  __typename?: 'TakenUsernameOrEmail';
  /** A detailed explanation of why the username or the email are taken. */
  message: Scalars['String'];
};

/** A user is an individual's account on Envenv that owns environments and can make new content. */
export type User = {
  __typename?: 'User';
  /** The unique id of the user. */
  id: Scalars['ID'];
  /** The picture / profile picture of the user. */
  picture?: Maybe<Scalars['URL']>;
  /** The provider of the account. */
  provider: AccountProvider;
  /** The username of the user. */
  username: Scalars['String'];
  /** The email of the user. */
  email?: Maybe<Scalars['EmailAddress']>;
  /** The name of the user. */
  name: Scalars['String'];
  /** The encrypted password of the user. */
  password: Scalars['String'];
  /** The role of the user. */
  role: UserRole;
  /** The date on which the user last changed their password. */
  lastPasswordChange?: Maybe<Scalars['DateTime']>;
  /** The environments which the user owns. */
  environments?: Maybe<Array<Maybe<Environment>>>;
};

/** Represents the result of an operation in which the requested user could not be found. */
export type UserNotFound = {
  __typename?: 'UserNotFound';
  /** A detailed explanation of why the requested user could not be found. */
  message: Scalars['String'];
};

/** Represents the result of an operation which queries a specific user. */
export type UserResult = User | UserNotFound | InvalidDataFormat;

/** The possible roles a user can have, represents what rights a user has. */
export enum UserRole {
  /**
   * User has basic rights on Envenv such as:
   * Creating environments,
   * Deleting environments,
   * Following other users...
   * This is the default value for every new user.
   */
  User = 'USER',
  /**
   * User has admin rights on Envenv such as:
   * Managing other users,
   * Suspending other users,
   * Deleting other users environments...
   */
  Admin = 'ADMIN',
}

/** Represents the result of an operation in which a password was attempted to be changed to the current password. */
export type WantsSamePassword = {
  __typename?: 'WantsSamePassword';
  /** A detailed explanation of what happened. */
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Find out if the user is logged in or not. */
  isLoggedIn: Scalars['Boolean'];
  /** Look up the currently logged in user. */
  me: User;
  /** Request an email with the instructions to reset an account's password. */
  requestPasswordResetEmail: RequestPasswordResetEmailPayload;
  /** Look up an user by id, username or email. */
  user: UserResult;
};

export type QueryRequestPasswordResetEmailArgs = {
  email: Scalars['EmailAddress'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['EmailAddress']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new environment. */
  createEnvironment: Environment;
  /** Deletes every user. This is only available in a testing environment. */
  deleteAllUsers: DeleteAllUsersResult;
  /** Logs user in. */
  login: LoginResult;
  /** Login user on the client, saves the csrf-token received from the server to localStorage. */
  loginClient: Scalars['Boolean'];
  /** Logs user out. */
  logout: LogoutResult;
  /** Logout user on the client, clears csrf-token from localStorage. */
  logoutClient: Scalars['Boolean'];
  /** Resets an account's password. */
  resetPassword: ResetPasswordResult;
  /** Signs user up. */
  signup: SignupResult;
};

export type MutationCreateEnvironmentArgs = {
  data: CreateEnvironmentInput;
};

export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MutationLoginClientArgs = {
  csrfToken: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type MutationSignupArgs = {
  data: CreateUserInput;
  provider?: Maybe<AccountProvider>;
};

export type LoginMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login:
    | ({ __typename: 'SuccessfulLogin' } & Pick<SuccessfulLogin, 'csrfToken'>)
    | ({ __typename: 'InvalidDataFormat' } & Pick<InvalidDataFormat, 'message'>)
    | ({ __typename: 'InvalidCredentials' } & Pick<
        InvalidCredentials,
        'message'
      >);
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: 'Mutation' } & {
  logout:
    | ({ __typename: 'NoCurrentSession' } & Pick<NoCurrentSession, 'message'>)
    | ({ __typename: 'SuccessfulLogout' } & Pick<
        SuccessfulLogout,
        'performedAt'
      >);
};

export type SignUpWithGithubMutationVariables = {
  data: CreateUserInput;
};

export type SignUpWithGithubMutation = { __typename?: 'Mutation' } & {
  signup:
    | ({ __typename: 'SuccessfulSignup' } & Pick<SuccessfulSignup, 'csrfToken'>)
    | ({ __typename: 'InvalidDataFormat' } & Pick<InvalidDataFormat, 'message'>)
    | ({ __typename: 'TakenUsernameOrEmail' } & Pick<
        TakenUsernameOrEmail,
        'message'
      >);
};

export type SignUpMutationVariables = {
  data: CreateUserInput;
};

export type SignUpMutation = { __typename?: 'Mutation' } & {
  signup:
    | ({ __typename: 'SuccessfulSignup' } & Pick<SuccessfulSignup, 'csrfToken'>)
    | ({ __typename: 'InvalidDataFormat' } & Pick<InvalidDataFormat, 'message'>)
    | ({ __typename: 'TakenUsernameOrEmail' } & Pick<
        TakenUsernameOrEmail,
        'message'
      >);
};

export type WhoAmIQueryVariables = {};

export type WhoAmIQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<
    User,
    'name' | 'username' | 'email' | 'picture'
  > & {
      environments?: Maybe<
        Array<
          Maybe<
            { __typename?: 'Environment' } & Pick<Environment, 'id' | 'name'>
          >
        >
      >;
    };
};

export type LoginOnClientMutationVariables = {
  csrfToken: Scalars['String'];
};

export type LoginOnClientMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'loginClient'
>;

export type LogoutOnClientMutationVariables = {};

export type LogoutOnClientMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logoutClient'
>;

export type IsUserLoggedInQueryVariables = {};

export type IsUserLoggedInQuery = { __typename?: 'Query' } & Pick<
  Query,
  'isLoggedIn'
>;

export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      __typename
      ... on SuccessfulLogin {
        csrfToken
      }
      ... on InvalidCredentials {
        message
      }
      ... on InvalidDataFormat {
        message
      }
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      __typename
      ... on NoCurrentSession {
        message
      }
      ... on SuccessfulLogout {
        performedAt
      }
    }
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const SignUpWithGithubDocument = gql`
  mutation SignUpWithGithub($data: CreateUserInput!) {
    signup(data: $data, provider: GITHUB) {
      __typename
      ... on SuccessfulSignup {
        csrfToken
      }
      ... on InvalidDataFormat {
        message
      }
      ... on TakenUsernameOrEmail {
        message
      }
    }
  }
`;
export type SignUpWithGithubMutationFn = ApolloReactCommon.MutationFunction<
  SignUpWithGithubMutation,
  SignUpWithGithubMutationVariables
>;

/**
 * __useSignUpWithGithubMutation__
 *
 * To run a mutation, you first call `useSignUpWithGithubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpWithGithubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpWithGithubMutation, { data, loading, error }] = useSignUpWithGithubMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpWithGithubMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignUpWithGithubMutation,
    SignUpWithGithubMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SignUpWithGithubMutation,
    SignUpWithGithubMutationVariables
  >(SignUpWithGithubDocument, baseOptions);
}
export type SignUpWithGithubMutationHookResult = ReturnType<
  typeof useSignUpWithGithubMutation
>;
export type SignUpWithGithubMutationResult = ApolloReactCommon.MutationResult<
  SignUpWithGithubMutation
>;
export type SignUpWithGithubMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignUpWithGithubMutation,
  SignUpWithGithubMutationVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($data: CreateUserInput!) {
    signup(data: $data) {
      __typename
      ... on SuccessfulSignup {
        csrfToken
      }
      ... on InvalidDataFormat {
        message
      }
      ... on TakenUsernameOrEmail {
        message
      }
    }
  }
`;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    baseOptions
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<
  SignUpMutation
>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
export const WhoAmIDocument = gql`
  query WhoAmI {
    me {
      name
      username
      email
      picture
      environments {
        id
        name
      }
    }
  }
`;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    WhoAmIQuery,
    WhoAmIQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(
    WhoAmIDocument,
    baseOptions
  );
}
export function useWhoAmILazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    WhoAmIQuery,
    WhoAmIQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(
    WhoAmIDocument,
    baseOptions
  );
}
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmIQueryResult = ApolloReactCommon.QueryResult<
  WhoAmIQuery,
  WhoAmIQueryVariables
>;
export const LoginOnClientDocument = gql`
  mutation LoginOnClient($csrfToken: String!) {
    loginClient(csrfToken: $csrfToken) @client
  }
`;
export type LoginOnClientMutationFn = ApolloReactCommon.MutationFunction<
  LoginOnClientMutation,
  LoginOnClientMutationVariables
>;

/**
 * __useLoginOnClientMutation__
 *
 * To run a mutation, you first call `useLoginOnClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginOnClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginOnClientMutation, { data, loading, error }] = useLoginOnClientMutation({
 *   variables: {
 *      csrfToken: // value for 'csrfToken'
 *   },
 * });
 */
export function useLoginOnClientMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginOnClientMutation,
    LoginOnClientMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    LoginOnClientMutation,
    LoginOnClientMutationVariables
  >(LoginOnClientDocument, baseOptions);
}
export type LoginOnClientMutationHookResult = ReturnType<
  typeof useLoginOnClientMutation
>;
export type LoginOnClientMutationResult = ApolloReactCommon.MutationResult<
  LoginOnClientMutation
>;
export type LoginOnClientMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginOnClientMutation,
  LoginOnClientMutationVariables
>;
export const LogoutOnClientDocument = gql`
  mutation LogoutOnClient {
    logoutClient @client
  }
`;
export type LogoutOnClientMutationFn = ApolloReactCommon.MutationFunction<
  LogoutOnClientMutation,
  LogoutOnClientMutationVariables
>;

/**
 * __useLogoutOnClientMutation__
 *
 * To run a mutation, you first call `useLogoutOnClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutOnClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutOnClientMutation, { data, loading, error }] = useLogoutOnClientMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutOnClientMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutOnClientMutation,
    LogoutOnClientMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    LogoutOnClientMutation,
    LogoutOnClientMutationVariables
  >(LogoutOnClientDocument, baseOptions);
}
export type LogoutOnClientMutationHookResult = ReturnType<
  typeof useLogoutOnClientMutation
>;
export type LogoutOnClientMutationResult = ApolloReactCommon.MutationResult<
  LogoutOnClientMutation
>;
export type LogoutOnClientMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutOnClientMutation,
  LogoutOnClientMutationVariables
>;
export const IsUserLoggedInDocument = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

/**
 * __useIsUserLoggedInQuery__
 *
 * To run a query within a React component, call `useIsUserLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsUserLoggedInQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables
  >(IsUserLoggedInDocument, baseOptions);
}
export function useIsUserLoggedInLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    IsUserLoggedInQuery,
    IsUserLoggedInQueryVariables
  >(IsUserLoggedInDocument, baseOptions);
}
export type IsUserLoggedInQueryHookResult = ReturnType<
  typeof useIsUserLoggedInQuery
>;
export type IsUserLoggedInLazyQueryHookResult = ReturnType<
  typeof useIsUserLoggedInLazyQuery
>;
export type IsUserLoggedInQueryResult = ApolloReactCommon.QueryResult<
  IsUserLoggedInQuery,
  IsUserLoggedInQueryVariables
>;
