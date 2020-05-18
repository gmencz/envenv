import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
   __typename?: 'Query';
  requestPasswordResetEmail: RequestPasswordResetEmailResult;
  user: UserResult;
};


export type QueryRequestPasswordResetEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  signup: SignupResult;
  signupWithExternalProvider: SignupResult;
  automateLoginProcess: AutomateLoginResult;
  login: LoginResult;
  resetPassword: ResetPasswordResult;
};


export type MutationSignupArgs = {
  data: CreateUserInput;
};


export type MutationSignupWithExternalProviderArgs = {
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  data?: Maybe<ResetPasswordInput>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  picture?: Maybe<Scalars['String']>;
  provider: AccountProvider;
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  lastPasswordChange?: Maybe<Scalars['String']>;
};

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN'
}

export enum AccountProvider {
  Google = 'GOOGLE',
  None = 'NONE'
}

export type TakenUsernameOrEmail = {
   __typename?: 'TakenUsernameOrEmail';
  message: Scalars['String'];
};

export type InvalidDataFormat = {
   __typename?: 'InvalidDataFormat';
  message: Scalars['String'];
};

export type SuccessfulSignup = {
   __typename?: 'SuccessfulSignup';
  user: User;
  csrfToken: Scalars['String'];
};

export type SuccessfulLogin = {
   __typename?: 'SuccessfulLogin';
  user: User;
  csrfToken: Scalars['String'];
};

export type InvalidCredentials = {
   __typename?: 'InvalidCredentials';
  message: Scalars['String'];
};

export type InvalidOrMissingUserIdentifier = {
   __typename?: 'InvalidOrMissingUserIdentifier';
  message: Scalars['String'];
};

export type InvalidOrExpiredToken = {
   __typename?: 'InvalidOrExpiredToken';
  message: Scalars['String'];
};

export type PasswordsDontMatch = {
   __typename?: 'PasswordsDontMatch';
  message: Scalars['String'];
};

export type UserNotFound = {
   __typename?: 'UserNotFound';
  message: Scalars['String'];
};

export type EmailMayHaveBeenSent = {
   __typename?: 'EmailMayHaveBeenSent';
  message: Scalars['String'];
};

export type UserResult = User | UserNotFound | InvalidDataFormat;

export type RequestPasswordResetEmailResult = EmailMayHaveBeenSent | InvalidDataFormat;

export type ResetPasswordResult = User | InvalidOrExpiredToken | PasswordsDontMatch;

export type AutomateLoginResult = SuccessfulLogin | InvalidOrMissingUserIdentifier;

export type SignupResult = SuccessfulSignup | InvalidDataFormat | TakenUsernameOrEmail;

export type LoginResult = SuccessfulLogin | InvalidDataFormat | InvalidCredentials;

export type ResetPasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type CreateUserInput = {
  picture?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Query: ResolverTypeWrapper<{}>,
  Mutation: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  UserRole: UserRole,
  AccountProvider: AccountProvider,
  TakenUsernameOrEmail: ResolverTypeWrapper<TakenUsernameOrEmail>,
  InvalidDataFormat: ResolverTypeWrapper<InvalidDataFormat>,
  SuccessfulSignup: ResolverTypeWrapper<SuccessfulSignup>,
  SuccessfulLogin: ResolverTypeWrapper<SuccessfulLogin>,
  InvalidCredentials: ResolverTypeWrapper<InvalidCredentials>,
  InvalidOrMissingUserIdentifier: ResolverTypeWrapper<InvalidOrMissingUserIdentifier>,
  InvalidOrExpiredToken: ResolverTypeWrapper<InvalidOrExpiredToken>,
  PasswordsDontMatch: ResolverTypeWrapper<PasswordsDontMatch>,
  UserNotFound: ResolverTypeWrapper<UserNotFound>,
  EmailMayHaveBeenSent: ResolverTypeWrapper<EmailMayHaveBeenSent>,
  UserResult: ResolversTypes['User'] | ResolversTypes['UserNotFound'] | ResolversTypes['InvalidDataFormat'],
  RequestPasswordResetEmailResult: ResolversTypes['EmailMayHaveBeenSent'] | ResolversTypes['InvalidDataFormat'],
  ResetPasswordResult: ResolversTypes['User'] | ResolversTypes['InvalidOrExpiredToken'] | ResolversTypes['PasswordsDontMatch'],
  AutomateLoginResult: ResolversTypes['SuccessfulLogin'] | ResolversTypes['InvalidOrMissingUserIdentifier'],
  SignupResult: ResolversTypes['SuccessfulSignup'] | ResolversTypes['InvalidDataFormat'] | ResolversTypes['TakenUsernameOrEmail'],
  LoginResult: ResolversTypes['SuccessfulLogin'] | ResolversTypes['InvalidDataFormat'] | ResolversTypes['InvalidCredentials'],
  ResetPasswordInput: ResetPasswordInput,
  CreateUserInput: CreateUserInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Query: {},
  Mutation: {},
  User: User,
  ID: Scalars['ID'],
  UserRole: UserRole,
  AccountProvider: AccountProvider,
  TakenUsernameOrEmail: TakenUsernameOrEmail,
  InvalidDataFormat: InvalidDataFormat,
  SuccessfulSignup: SuccessfulSignup,
  SuccessfulLogin: SuccessfulLogin,
  InvalidCredentials: InvalidCredentials,
  InvalidOrMissingUserIdentifier: InvalidOrMissingUserIdentifier,
  InvalidOrExpiredToken: InvalidOrExpiredToken,
  PasswordsDontMatch: PasswordsDontMatch,
  UserNotFound: UserNotFound,
  EmailMayHaveBeenSent: EmailMayHaveBeenSent,
  UserResult: ResolversParentTypes['User'] | ResolversParentTypes['UserNotFound'] | ResolversParentTypes['InvalidDataFormat'],
  RequestPasswordResetEmailResult: ResolversParentTypes['EmailMayHaveBeenSent'] | ResolversParentTypes['InvalidDataFormat'],
  ResetPasswordResult: ResolversParentTypes['User'] | ResolversParentTypes['InvalidOrExpiredToken'] | ResolversParentTypes['PasswordsDontMatch'],
  AutomateLoginResult: ResolversParentTypes['SuccessfulLogin'] | ResolversParentTypes['InvalidOrMissingUserIdentifier'],
  SignupResult: ResolversParentTypes['SuccessfulSignup'] | ResolversParentTypes['InvalidDataFormat'] | ResolversParentTypes['TakenUsernameOrEmail'],
  LoginResult: ResolversParentTypes['SuccessfulLogin'] | ResolversParentTypes['InvalidDataFormat'] | ResolversParentTypes['InvalidCredentials'],
  ResetPasswordInput: ResetPasswordInput,
  CreateUserInput: CreateUserInput,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  requestPasswordResetEmail?: Resolver<ResolversTypes['RequestPasswordResetEmailResult'], ParentType, ContextType, RequireFields<QueryRequestPasswordResetEmailArgs, 'email'>>,
  user?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<QueryUserArgs, never>>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signup?: Resolver<ResolversTypes['SignupResult'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'data'>>,
  signupWithExternalProvider?: Resolver<ResolversTypes['SignupResult'], ParentType, ContextType, RequireFields<MutationSignupWithExternalProviderArgs, 'username'>>,
  automateLoginProcess?: Resolver<ResolversTypes['AutomateLoginResult'], ParentType, ContextType>,
  login?: Resolver<ResolversTypes['LoginResult'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>,
  resetPassword?: Resolver<ResolversTypes['ResetPasswordResult'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, never>>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  provider?: Resolver<ResolversTypes['AccountProvider'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>,
  lastPasswordChange?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TakenUsernameOrEmailResolvers<ContextType = any, ParentType extends ResolversParentTypes['TakenUsernameOrEmail'] = ResolversParentTypes['TakenUsernameOrEmail']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type InvalidDataFormatResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvalidDataFormat'] = ResolversParentTypes['InvalidDataFormat']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SuccessfulSignupResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuccessfulSignup'] = ResolversParentTypes['SuccessfulSignup']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  csrfToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SuccessfulLoginResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuccessfulLogin'] = ResolversParentTypes['SuccessfulLogin']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  csrfToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type InvalidCredentialsResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvalidCredentials'] = ResolversParentTypes['InvalidCredentials']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type InvalidOrMissingUserIdentifierResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvalidOrMissingUserIdentifier'] = ResolversParentTypes['InvalidOrMissingUserIdentifier']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type InvalidOrExpiredTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvalidOrExpiredToken'] = ResolversParentTypes['InvalidOrExpiredToken']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PasswordsDontMatchResolvers<ContextType = any, ParentType extends ResolversParentTypes['PasswordsDontMatch'] = ResolversParentTypes['PasswordsDontMatch']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserNotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNotFound'] = ResolversParentTypes['UserNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type EmailMayHaveBeenSentResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmailMayHaveBeenSent'] = ResolversParentTypes['EmailMayHaveBeenSent']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  __resolveType: TypeResolveFn<'User' | 'UserNotFound' | 'InvalidDataFormat', ParentType, ContextType>
};

export type RequestPasswordResetEmailResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestPasswordResetEmailResult'] = ResolversParentTypes['RequestPasswordResetEmailResult']> = {
  __resolveType: TypeResolveFn<'EmailMayHaveBeenSent' | 'InvalidDataFormat', ParentType, ContextType>
};

export type ResetPasswordResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetPasswordResult'] = ResolversParentTypes['ResetPasswordResult']> = {
  __resolveType: TypeResolveFn<'User' | 'InvalidOrExpiredToken' | 'PasswordsDontMatch', ParentType, ContextType>
};

export type AutomateLoginResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutomateLoginResult'] = ResolversParentTypes['AutomateLoginResult']> = {
  __resolveType: TypeResolveFn<'SuccessfulLogin' | 'InvalidOrMissingUserIdentifier', ParentType, ContextType>
};

export type SignupResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignupResult'] = ResolversParentTypes['SignupResult']> = {
  __resolveType: TypeResolveFn<'SuccessfulSignup' | 'InvalidDataFormat' | 'TakenUsernameOrEmail', ParentType, ContextType>
};

export type LoginResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']> = {
  __resolveType: TypeResolveFn<'SuccessfulLogin' | 'InvalidDataFormat' | 'InvalidCredentials', ParentType, ContextType>
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  TakenUsernameOrEmail?: TakenUsernameOrEmailResolvers<ContextType>,
  InvalidDataFormat?: InvalidDataFormatResolvers<ContextType>,
  SuccessfulSignup?: SuccessfulSignupResolvers<ContextType>,
  SuccessfulLogin?: SuccessfulLoginResolvers<ContextType>,
  InvalidCredentials?: InvalidCredentialsResolvers<ContextType>,
  InvalidOrMissingUserIdentifier?: InvalidOrMissingUserIdentifierResolvers<ContextType>,
  InvalidOrExpiredToken?: InvalidOrExpiredTokenResolvers<ContextType>,
  PasswordsDontMatch?: PasswordsDontMatchResolvers<ContextType>,
  UserNotFound?: UserNotFoundResolvers<ContextType>,
  EmailMayHaveBeenSent?: EmailMayHaveBeenSentResolvers<ContextType>,
  UserResult?: UserResultResolvers,
  RequestPasswordResetEmailResult?: RequestPasswordResetEmailResultResolvers,
  ResetPasswordResult?: ResetPasswordResultResolvers,
  AutomateLoginResult?: AutomateLoginResultResolvers,
  SignupResult?: SignupResultResolvers,
  LoginResult?: LoginResultResolvers,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
