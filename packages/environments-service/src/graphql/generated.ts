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
  _Any: any;
};

export type Environment = {
  __typename?: 'Environment';
  id: Scalars['Int'];
  name: Scalars['String'];
  owner: User;
  members?: Maybe<Array<Maybe<EnvironmentMember>>>;
};

export type EnvironmentMember = {
  __typename?: 'EnvironmentMember';
  id: Scalars['Int'];
  environment?: Maybe<Environment>;
  environmentRole?: Maybe<EnvironmentRole>;
  user: User;
};

export type CreateEnvironmentInput = {
  name: Scalars['String'];
  userCreatingEnvironmentId: Scalars['Int'];
};

export enum EnvironmentRole {
  Admin = 'ADMIN',
  Contributor = 'CONTRIBUTOR',
}

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  getEnvironments?: Maybe<Array<Maybe<Environment>>>;
};

export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};

export type _Entity = Environment | EnvironmentMember | User;

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEnvironment?: Maybe<Environment>;
};

export type MutationCreateEnvironmentArgs = {
  data?: Maybe<CreateEnvironmentInput>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  environments?: Maybe<Array<Maybe<Environment>>>;
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
  Environment: ResolverTypeWrapper<Environment>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  EnvironmentMember: ResolverTypeWrapper<EnvironmentMember>;
  CreateEnvironmentInput: CreateEnvironmentInput;
  EnvironmentRole: EnvironmentRole;
  Query: ResolverTypeWrapper<{}>;
  _Entity:
    | ResolversTypes['Environment']
    | ResolversTypes['EnvironmentMember']
    | ResolversTypes['User'];
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _Service: ResolverTypeWrapper<_Service>;
  Mutation: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Environment: Environment;
  Int: Scalars['Int'];
  EnvironmentMember: EnvironmentMember;
  CreateEnvironmentInput: CreateEnvironmentInput;
  EnvironmentRole: EnvironmentRole;
  Query: {};
  _Entity:
    | ResolversParentTypes['Environment']
    | ResolversParentTypes['EnvironmentMember']
    | ResolversParentTypes['User'];
  _Any: Scalars['_Any'];
  _Service: _Service;
  Mutation: {};
  User: User;
};

export type EnvironmentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Environment'] = ResolversParentTypes['Environment']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  members?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['EnvironmentMember']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type EnvironmentMemberResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EnvironmentMember'] = ResolversParentTypes['EnvironmentMember']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  environment?: Resolver<
    Maybe<ResolversTypes['Environment']>,
    ParentType,
    ContextType
  >;
  environmentRole?: Resolver<
    Maybe<ResolversTypes['EnvironmentRole']>,
    ParentType,
    ContextType
  >;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  _entities?: Resolver<
    Array<Maybe<ResolversTypes['_Entity']>>,
    ParentType,
    ContextType,
    RequireFields<Query_EntitiesArgs, 'representations'>
  >;
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  getEnvironments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Environment']>>>,
    ParentType,
    ContextType
  >;
};

export type _EntityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']
> = {
  __resolveType: TypeResolveFn<
    'Environment' | 'EnvironmentMember' | 'User',
    ParentType,
    ContextType
  >;
};

export interface _AnyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any';
}

export type _ServiceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']
> = {
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createEnvironment?: Resolver<
    Maybe<ResolversTypes['Environment']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateEnvironmentArgs, never>
  >;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  environments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Environment']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Environment?: EnvironmentResolvers<ContextType>;
  EnvironmentMember?: EnvironmentMemberResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  _Entity?: _EntityResolvers;
  _Any?: GraphQLScalarType;
  _Service?: _ServiceResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
