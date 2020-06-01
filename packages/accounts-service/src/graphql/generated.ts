import { ApolloContext } from '../typings';
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  DateTime: Date;
  _FieldSet: any;
};

/** The data required to reset an account's password. */
export type ResetPasswordInput = {
  /** The current password. */
  currentPassword: Scalars['String'];
  /** The new password. */
  newPassword: Scalars['String'];
  /** The token needed to reset the password. */
  token: Scalars['String'];
};

/** The data required to create a new user. */
export type CreateUserInput = {
  /**
   * The ID of the new user, this is useful if we want to sign up
   * with Github or some other provider, if not specified a unique id
   * will be generated.
   */
  id?: Maybe<Scalars['ID']>;
  /** The URL of the new user's picture/profile picture. */
  picture?: Maybe<Scalars['String']>;
  /** The username of the new user. */
  username: Scalars['String'];
  /** The email of the new user. */
  email: Scalars['String'];
  /** The name of the new user. */
  name: Scalars['String'];
  /** The plain password of the new user. */
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Signs user up. */
  signup: SignupResult;
  /** Logs user in. */
  login: LoginResult;
  /** Resets an account's password. */
  resetPassword: ResetPasswordResult;
  /** Logs user out. */
  logout: LogoutResult;
  /** Deletes every user. This is only available in a testing environment. */
  deleteAllUsers: DeleteAllUsersResult;
};

export type MutationSignupArgs = {
  data: CreateUserInput;
  provider?: Maybe<AccountProvider>;
};

export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

/** Represents the result of an operation which deletes all users. */
export type DeleteAllUsersResult = NotInTestingEnvironment | SuccessfulRemoval;

/** Represents the result of an operation which queries a specific user. */
export type UserResult = User | UserNotFound | InvalidDataFormat;

/** Represents the result of an operation which requests an email with the instructions to reset an account's password. */
export type RequestPasswordResetEmailPayload =
  | EmailMayHaveBeenSent
  | InvalidDataFormat;

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

/** Represents the result of an operation which logs a user in. */
export type LoginResult =
  | SuccessfulLogin
  | InvalidDataFormat
  | InvalidCredentials;

export type LogoutResult = NoCurrentSession | SuccessfulLogout;

/** Represents the result of an operation in which the provided username or email are taken. */
export type TakenUsernameOrEmail = {
  __typename?: 'TakenUsernameOrEmail';
  /** A detailed explanation of why the username or the email are taken. */
  message: Scalars['String'];
};

/** Represents the result of an operation in which the provided data did not meet Envenv's security requirements or overall data requirements. */
export type InvalidDataFormat = {
  __typename?: 'InvalidDataFormat';
  /** A detailed explanation of why the data was invalid and which piece of the data caused the issue. */
  message: Scalars['String'];
};

/** Represents a successful user signup. */
export type SuccessfulSignup = {
  __typename?: 'SuccessfulSignup';
  user: User;
  /** The CSRF token for the started session. */
  csrfToken: Scalars['String'];
};

/** Represents a successful login. */
export type SuccessfulLogin = {
  __typename?: 'SuccessfulLogin';
  /** The user who logged in. */
  user: User;
  /** The CSRF token for the started session. */
  csrfToken: Scalars['String'];
};

/** Represents the result of an operation in which the provided credentials were invalid. */
export type InvalidCredentials = {
  __typename?: 'InvalidCredentials';
  /** A detailed explanation of why the credentials were invalid. */
  message: Scalars['String'];
};

/** Represents the result of an operation in which the provided token was invalid or expired. */
export type InvalidOrExpiredToken = {
  __typename?: 'InvalidOrExpiredToken';
  /** A detailed explanation of why the token was invalid or expired. */
  message: Scalars['String'];
};

/** Represents the result of an operation in which the provided password did not match the current one. */
export type PasswordsDontMatch = {
  __typename?: 'PasswordsDontMatch';
  /** A detailed explanation of why the passwords did not match. */
  message: Scalars['String'];
};

/** Represents the result of an operation in which the requested user could not be found. */
export type UserNotFound = {
  __typename?: 'UserNotFound';
  /** A detailed explanation of why the requested user could not be found. */
  message: Scalars['String'];
};

/** Represents the result of an operation in which the email may have been sent or not depending on the email's validity. */
export type EmailMayHaveBeenSent = {
  __typename?: 'EmailMayHaveBeenSent';
  /** A detailed explanation of why the email may or may not have been sent. */
  message: Scalars['String'];
};

/** Represents the result of a testing-only operation which was attempted to be executed on a non-testing environment. */
export type NotInTestingEnvironment = {
  __typename?: 'NotInTestingEnvironment';
  /** A detailed explanation of why the operation could not be executed in the attempted environment. */
  message: Scalars['String'];
};

/** Represents the successful removal of a resource. */
export type SuccessfulRemoval = {
  __typename?: 'SuccessfulRemoval';
  /** The amount of resources removed. */
  count: Scalars['Int'];
};

/** Represents the result of an operation in which a password was attempted to be changed to the current password. */
export type WantsSamePassword = {
  __typename?: 'WantsSamePassword';
  /** A detailed explanation of what happened. */
  message: Scalars['String'];
};

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

/** Represents the result of a successful logout. */
export type SuccessfulLogout = {
  __typename?: 'SuccessfulLogout';
  /** The time at which the logout was performed. */
  performedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  /** Request an email with the instructions to reset an account's password. */
  requestPasswordResetEmail: RequestPasswordResetEmailPayload;
  /** Look up an user by id, username or email. */
  user: UserResult;
  /** Look up the currently logged in user. */
  me: User;
};

export type QueryRequestPasswordResetEmailArgs = {
  email: Scalars['String'];
};

export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

/** A user is an individual's account on Envenv that owns environments and can make new content. */
export type User = {
  __typename?: 'User';
  /** The unique id of the user. */
  id: Scalars['ID'];
  /** The picture / profile picture of the user. */
  picture?: Maybe<Scalars['String']>;
  /** The provider of the account. */
  provider: AccountProvider;
  /** The username of the user. */
  username: Scalars['String'];
  /** The email of the user. */
  email?: Maybe<Scalars['String']>;
  /** The name of the user. */
  name: Scalars['String'];
  /** The encrypted password of the user. */
  password: Scalars['String'];
  /** The role of the user. */
  role: UserRole;
  /** The date on which the user last changed their password. */
  lastPasswordChange?: Maybe<Scalars['DateTime']>;
};

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

/** The possible providers of a user's account. */
export enum AccountProvider {
  /** The user provided their account details via github. */
  Github = 'GITHUB',
  /** The user provided their own account details to use exclusively on Envenv. */
  None = 'NONE',
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
  reference: TReference,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ResetPasswordInput: ResetPasswordInput;
  CreateUserInput: CreateUserInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  DeleteAllUsersResult:
    | ResolversTypes['NotInTestingEnvironment']
    | ResolversTypes['SuccessfulRemoval'];
  UserResult:
    | ResolversTypes['User']
    | ResolversTypes['UserNotFound']
    | ResolversTypes['InvalidDataFormat'];
  RequestPasswordResetEmailPayload:
    | ResolversTypes['EmailMayHaveBeenSent']
    | ResolversTypes['InvalidDataFormat'];
  ResetPasswordResult:
    | ResolversTypes['User']
    | ResolversTypes['InvalidOrExpiredToken']
    | ResolversTypes['PasswordsDontMatch']
    | ResolversTypes['WantsSamePassword']
    | ResolversTypes['InvalidDataFormat'];
  SignupResult:
    | ResolversTypes['SuccessfulSignup']
    | ResolversTypes['InvalidDataFormat']
    | ResolversTypes['TakenUsernameOrEmail'];
  LoginResult:
    | ResolversTypes['SuccessfulLogin']
    | ResolversTypes['InvalidDataFormat']
    | ResolversTypes['InvalidCredentials'];
  LogoutResult:
    | ResolversTypes['NoCurrentSession']
    | ResolversTypes['SuccessfulLogout'];
  TakenUsernameOrEmail: ResolverTypeWrapper<TakenUsernameOrEmail>;
  InvalidDataFormat: ResolverTypeWrapper<InvalidDataFormat>;
  SuccessfulSignup: ResolverTypeWrapper<SuccessfulSignup>;
  SuccessfulLogin: ResolverTypeWrapper<SuccessfulLogin>;
  InvalidCredentials: ResolverTypeWrapper<InvalidCredentials>;
  InvalidOrExpiredToken: ResolverTypeWrapper<InvalidOrExpiredToken>;
  PasswordsDontMatch: ResolverTypeWrapper<PasswordsDontMatch>;
  UserNotFound: ResolverTypeWrapper<UserNotFound>;
  EmailMayHaveBeenSent: ResolverTypeWrapper<EmailMayHaveBeenSent>;
  NotInTestingEnvironment: ResolverTypeWrapper<NotInTestingEnvironment>;
  SuccessfulRemoval: ResolverTypeWrapper<SuccessfulRemoval>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  WantsSamePassword: ResolverTypeWrapper<WantsSamePassword>;
  NoCurrentSession: ResolverTypeWrapper<NoCurrentSession>;
  SuccessfulLogout: ResolverTypeWrapper<SuccessfulLogout>;
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserRole: UserRole;
  AccountProvider: AccountProvider;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  ResetPasswordInput: ResetPasswordInput;
  CreateUserInput: CreateUserInput;
  ID: Scalars['ID'];
  Mutation: {};
  DeleteAllUsersResult:
    | ResolversParentTypes['NotInTestingEnvironment']
    | ResolversParentTypes['SuccessfulRemoval'];
  UserResult:
    | ResolversParentTypes['User']
    | ResolversParentTypes['UserNotFound']
    | ResolversParentTypes['InvalidDataFormat'];
  RequestPasswordResetEmailPayload:
    | ResolversParentTypes['EmailMayHaveBeenSent']
    | ResolversParentTypes['InvalidDataFormat'];
  ResetPasswordResult:
    | ResolversParentTypes['User']
    | ResolversParentTypes['InvalidOrExpiredToken']
    | ResolversParentTypes['PasswordsDontMatch']
    | ResolversParentTypes['WantsSamePassword']
    | ResolversParentTypes['InvalidDataFormat'];
  SignupResult:
    | ResolversParentTypes['SuccessfulSignup']
    | ResolversParentTypes['InvalidDataFormat']
    | ResolversParentTypes['TakenUsernameOrEmail'];
  LoginResult:
    | ResolversParentTypes['SuccessfulLogin']
    | ResolversParentTypes['InvalidDataFormat']
    | ResolversParentTypes['InvalidCredentials'];
  LogoutResult:
    | ResolversParentTypes['NoCurrentSession']
    | ResolversParentTypes['SuccessfulLogout'];
  TakenUsernameOrEmail: TakenUsernameOrEmail;
  InvalidDataFormat: InvalidDataFormat;
  SuccessfulSignup: SuccessfulSignup;
  SuccessfulLogin: SuccessfulLogin;
  InvalidCredentials: InvalidCredentials;
  InvalidOrExpiredToken: InvalidOrExpiredToken;
  PasswordsDontMatch: PasswordsDontMatch;
  UserNotFound: UserNotFound;
  EmailMayHaveBeenSent: EmailMayHaveBeenSent;
  NotInTestingEnvironment: NotInTestingEnvironment;
  SuccessfulRemoval: SuccessfulRemoval;
  Int: Scalars['Int'];
  WantsSamePassword: WantsSamePassword;
  NoCurrentSession: NoCurrentSession;
  SuccessfulLogout: SuccessfulLogout;
  Query: {};
  User: User;
  UserRole: UserRole;
  AccountProvider: AccountProvider;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  signup?: Resolver<
    ResolversTypes['SignupResult'],
    ParentType,
    ContextType,
    RequireFields<MutationSignupArgs, 'data'>
  >;
  login?: Resolver<
    ResolversTypes['LoginResult'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'username' | 'password'>
  >;
  resetPassword?: Resolver<
    ResolversTypes['ResetPasswordResult'],
    ParentType,
    ContextType,
    RequireFields<MutationResetPasswordArgs, 'data'>
  >;
  logout?: Resolver<ResolversTypes['LogoutResult'], ParentType, ContextType>;
  deleteAllUsers?: Resolver<
    ResolversTypes['DeleteAllUsersResult'],
    ParentType,
    ContextType
  >;
};

export type DeleteAllUsersResultResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['DeleteAllUsersResult'] = ResolversParentTypes['DeleteAllUsersResult']
> = {
  __resolveType: TypeResolveFn<
    'NotInTestingEnvironment' | 'SuccessfulRemoval',
    ParentType,
    ContextType
  >;
};

export type UserResultResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']
> = {
  __resolveType: TypeResolveFn<
    'User' | 'UserNotFound' | 'InvalidDataFormat',
    ParentType,
    ContextType
  >;
};

export type RequestPasswordResetEmailPayloadResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['RequestPasswordResetEmailPayload'] = ResolversParentTypes['RequestPasswordResetEmailPayload']
> = {
  __resolveType: TypeResolveFn<
    'EmailMayHaveBeenSent' | 'InvalidDataFormat',
    ParentType,
    ContextType
  >;
};

export type ResetPasswordResultResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['ResetPasswordResult'] = ResolversParentTypes['ResetPasswordResult']
> = {
  __resolveType: TypeResolveFn<
    | 'User'
    | 'InvalidOrExpiredToken'
    | 'PasswordsDontMatch'
    | 'WantsSamePassword'
    | 'InvalidDataFormat',
    ParentType,
    ContextType
  >;
};

export type SignupResultResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['SignupResult'] = ResolversParentTypes['SignupResult']
> = {
  __resolveType: TypeResolveFn<
    'SuccessfulSignup' | 'InvalidDataFormat' | 'TakenUsernameOrEmail',
    ParentType,
    ContextType
  >;
};

export type LoginResultResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']
> = {
  __resolveType: TypeResolveFn<
    'SuccessfulLogin' | 'InvalidDataFormat' | 'InvalidCredentials',
    ParentType,
    ContextType
  >;
};

export type LogoutResultResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['LogoutResult'] = ResolversParentTypes['LogoutResult']
> = {
  __resolveType: TypeResolveFn<
    'NoCurrentSession' | 'SuccessfulLogout',
    ParentType,
    ContextType
  >;
};

export type TakenUsernameOrEmailResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['TakenUsernameOrEmail'] = ResolversParentTypes['TakenUsernameOrEmail']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type InvalidDataFormatResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['InvalidDataFormat'] = ResolversParentTypes['InvalidDataFormat']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type SuccessfulSignupResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['SuccessfulSignup'] = ResolversParentTypes['SuccessfulSignup']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  csrfToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type SuccessfulLoginResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['SuccessfulLogin'] = ResolversParentTypes['SuccessfulLogin']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  csrfToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type InvalidCredentialsResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['InvalidCredentials'] = ResolversParentTypes['InvalidCredentials']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type InvalidOrExpiredTokenResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['InvalidOrExpiredToken'] = ResolversParentTypes['InvalidOrExpiredToken']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type PasswordsDontMatchResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['PasswordsDontMatch'] = ResolversParentTypes['PasswordsDontMatch']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type UserNotFoundResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['UserNotFound'] = ResolversParentTypes['UserNotFound']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type EmailMayHaveBeenSentResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['EmailMayHaveBeenSent'] = ResolversParentTypes['EmailMayHaveBeenSent']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type NotInTestingEnvironmentResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['NotInTestingEnvironment'] = ResolversParentTypes['NotInTestingEnvironment']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type SuccessfulRemovalResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['SuccessfulRemoval'] = ResolversParentTypes['SuccessfulRemoval']
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type WantsSamePasswordResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['WantsSamePassword'] = ResolversParentTypes['WantsSamePassword']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type NoCurrentSessionResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['NoCurrentSession'] = ResolversParentTypes['NoCurrentSession']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type SuccessfulLogoutResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['SuccessfulLogout'] = ResolversParentTypes['SuccessfulLogout']
> = {
  performedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  requestPasswordResetEmail?: Resolver<
    ResolversTypes['RequestPasswordResetEmailPayload'],
    ParentType,
    ContextType,
    RequireFields<QueryRequestPasswordResetEmailArgs, 'email'>
  >;
  user?: Resolver<
    ResolversTypes['UserResult'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, never>
  >;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['User']>,
    { __typename: 'User' } & Pick<ParentType, 'id'>,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<
    ResolversTypes['AccountProvider'],
    ParentType,
    ContextType
  >;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  lastPasswordChange?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  DeleteAllUsersResult?: DeleteAllUsersResultResolvers;
  UserResult?: UserResultResolvers;
  RequestPasswordResetEmailPayload?: RequestPasswordResetEmailPayloadResolvers;
  ResetPasswordResult?: ResetPasswordResultResolvers;
  SignupResult?: SignupResultResolvers;
  LoginResult?: LoginResultResolvers;
  LogoutResult?: LogoutResultResolvers;
  TakenUsernameOrEmail?: TakenUsernameOrEmailResolvers<ContextType>;
  InvalidDataFormat?: InvalidDataFormatResolvers<ContextType>;
  SuccessfulSignup?: SuccessfulSignupResolvers<ContextType>;
  SuccessfulLogin?: SuccessfulLoginResolvers<ContextType>;
  InvalidCredentials?: InvalidCredentialsResolvers<ContextType>;
  InvalidOrExpiredToken?: InvalidOrExpiredTokenResolvers<ContextType>;
  PasswordsDontMatch?: PasswordsDontMatchResolvers<ContextType>;
  UserNotFound?: UserNotFoundResolvers<ContextType>;
  EmailMayHaveBeenSent?: EmailMayHaveBeenSentResolvers<ContextType>;
  NotInTestingEnvironment?: NotInTestingEnvironmentResolvers<ContextType>;
  SuccessfulRemoval?: SuccessfulRemovalResolvers<ContextType>;
  WantsSamePassword?: WantsSamePasswordResolvers<ContextType>;
  NoCurrentSession?: NoCurrentSessionResolvers<ContextType>;
  SuccessfulLogout?: SuccessfulLogoutResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ApolloContext> = Resolvers<ContextType>;
