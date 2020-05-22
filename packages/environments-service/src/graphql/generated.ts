import { ApolloContext } from '../../typings';
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
  _FieldSet: any;
};





export type Environment = {
   __typename?: 'Environment';
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: User;
  members?: Maybe<Array<Maybe<EnvironmentMember>>>;
};

export type EnvironmentMember = {
   __typename?: 'EnvironmentMember';
  id: Scalars['ID'];
  environment?: Maybe<Environment>;
  environmentRole?: Maybe<EnvironmentRole>;
  user: User;
};

export enum EnvironmentRole {
  Admin = 'ADMIN',
  Contributor = 'CONTRIBUTOR'
}

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  environments?: Maybe<Array<Maybe<Environment>>>;
};

export type CreateEnvironmentInput = {
  name: Scalars['String'];
  userCreatingEnvironmentId: Scalars['ID'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createEnvironment?: Maybe<Environment>;
};


export type MutationCreateEnvironmentArgs = {
  data: CreateEnvironmentInput;
};

export type Query = {
   __typename?: 'Query';
  getEnvironments?: Maybe<Array<Maybe<Environment>>>;
};




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
  Environment: ResolverTypeWrapper<Environment>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  EnvironmentMember: ResolverTypeWrapper<EnvironmentMember>,
  EnvironmentRole: EnvironmentRole,
  User: ResolverTypeWrapper<User>,
  CreateEnvironmentInput: CreateEnvironmentInput,
  Mutation: ResolverTypeWrapper<{}>,
  Query: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Environment: Environment,
  ID: Scalars['ID'],
  EnvironmentMember: EnvironmentMember,
  EnvironmentRole: EnvironmentRole,
  User: User,
  CreateEnvironmentInput: CreateEnvironmentInput,
  Mutation: {},
  Query: {},
};

export type EnvironmentResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Environment'] = ResolversParentTypes['Environment']> = {
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Environment']>, { __typename: 'Environment' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['EnvironmentMember']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type EnvironmentMemberResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['EnvironmentMember'] = ResolversParentTypes['EnvironmentMember']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  environment?: Resolver<Maybe<ResolversTypes['Environment']>, ParentType, ContextType>,
  environmentRole?: Resolver<Maybe<ResolversTypes['EnvironmentRole']>, ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['User']>, { __typename: 'User' } & Pick<ParentType, 'id'>, ContextType>,

  environments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Environment']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createEnvironment?: Resolver<Maybe<ResolversTypes['Environment']>, ParentType, ContextType, RequireFields<MutationCreateEnvironmentArgs, 'data'>>,
};

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getEnvironments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Environment']>>>, ParentType, ContextType>,
};

export type Resolvers<ContextType = ApolloContext> = {
  Environment?: EnvironmentResolvers<ContextType>,
  EnvironmentMember?: EnvironmentMemberResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ApolloContext> = Resolvers<ContextType>;
