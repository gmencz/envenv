import { GraphQLResolveInfo } from 'graphql';
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
};

export type Query = {
  __typename?: 'Query';
  requestPasswordResetEmail: Scalars['Boolean'];
};

export type QueryRequestPasswordResetEmailArgs = {
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: AuthResponse;
  signupWithExternalProvider: AuthResponse;
  automateLoginProcess: AuthResponse;
  login: AuthResponse;
  resetPassword: User;
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

export type ResetPasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type CreateUserInput = {
  id?: Maybe<Scalars['Int']>;
  picture?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  user: User;
  csrfToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  picture?: Maybe<Scalars['String']>;
  provider: Provider;
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: Role;
  lastPasswordChange?: Maybe<Scalars['String']>;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

export enum Provider {
  Google = 'GOOGLE',
  None = 'NONE',
}

export type Environment = {
  __typename?: 'Environment';
  id: Scalars['Int'];
};

export type EnvironmentMember = {
  __typename?: 'EnvironmentMember';
  id: Scalars['Int'];
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
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  ResetPasswordInput: ResetPasswordInput;
  CreateUserInput: CreateUserInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  User: ResolverTypeWrapper<User>;
  Role: Role;
  Provider: Provider;
  Environment: ResolverTypeWrapper<Environment>;
  EnvironmentMember: ResolverTypeWrapper<EnvironmentMember>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Query: {};
  Mutation: {};
  ResetPasswordInput: ResetPasswordInput;
  CreateUserInput: CreateUserInput;
  Int: Scalars['Int'];
  AuthResponse: AuthResponse;
  User: User;
  Role: Role;
  Provider: Provider;
  Environment: Environment;
  EnvironmentMember: EnvironmentMember;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  requestPasswordResetEmail?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<QueryRequestPasswordResetEmailArgs, 'email'>
  >;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  signup?: Resolver<
    ResolversTypes['AuthResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSignupArgs, 'data'>
  >;
  signupWithExternalProvider?: Resolver<
    ResolversTypes['AuthResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSignupWithExternalProviderArgs, 'username'>
  >;
  automateLoginProcess?: Resolver<
    ResolversTypes['AuthResponse'],
    ParentType,
    ContextType
  >;
  login?: Resolver<
    ResolversTypes['AuthResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'username' | 'password'>
  >;
  resetPassword?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationResetPasswordArgs, never>
  >;
};

export type AuthResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  csrfToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['Provider'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  lastPasswordChange?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type EnvironmentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Environment'] = ResolversParentTypes['Environment']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type EnvironmentMemberResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EnvironmentMember'] = ResolversParentTypes['EnvironmentMember']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Environment?: EnvironmentResolvers<ContextType>;
  EnvironmentMember?: EnvironmentMemberResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
