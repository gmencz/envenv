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
  Integer: any;
  Str: any;
  _FieldSet: any;
};

/** An environment is an Envenv project owned by a user which contains the remote (Github, BitBucket, etc) non-production project secrets. */
export type Environment = {
  __typename?: 'Environment';
  /** The unique id of the environment. */
  id: Scalars['ID'];
  /** The name of the environment. */
  name: Scalars['Str'];
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

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  /** The environments which the user owns. */
  environments?: Maybe<Array<Maybe<Environment>>>;
};

/** The data required to create an environment. */
export type CreateEnvironmentInput = {
  /** The name of the environment. */
  name: Scalars['Str'];
  /** The id of the user creating the environment. */
  userCreatingEnvironmentId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new environment. */
  createEnvironment: Environment;
};

export type MutationCreateEnvironmentArgs = {
  data: CreateEnvironmentInput;
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
  Integer: ResolverTypeWrapper<Scalars['Integer']>;
  Str: ResolverTypeWrapper<Scalars['Str']>;
  Environment: ResolverTypeWrapper<Environment>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  EnvironmentMember: ResolverTypeWrapper<EnvironmentMember>;
  EnvironmentRole: EnvironmentRole;
  User: ResolverTypeWrapper<User>;
  CreateEnvironmentInput: CreateEnvironmentInput;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Integer: Scalars['Integer'];
  Str: Scalars['Str'];
  Environment: Environment;
  ID: Scalars['ID'];
  EnvironmentMember: EnvironmentMember;
  EnvironmentRole: EnvironmentRole;
  User: User;
  CreateEnvironmentInput: CreateEnvironmentInput;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
};

export interface IntegerScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Integer'], any> {
  name: 'Integer';
}

export interface StrScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Str'], any> {
  name: 'Str';
}

export type EnvironmentResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Environment'] = ResolversParentTypes['Environment']
> = {
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Environment']>,
    { __typename: 'Environment' } & Pick<ParentType, 'id'>,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['Str'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  members?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['EnvironmentMember']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type EnvironmentMemberResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['EnvironmentMember'] = ResolversParentTypes['EnvironmentMember']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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

export type UserResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['User']>,
    { __typename: 'User' } & Pick<ParentType, 'id'>,
    ContextType
  >;

  environments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Environment']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createEnvironment?: Resolver<
    ResolversTypes['Environment'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateEnvironmentArgs, 'data'>
  >;
};

export type Resolvers<ContextType = ApolloContext> = {
  Integer?: GraphQLScalarType;
  Str?: GraphQLScalarType;
  Environment?: EnvironmentResolvers<ContextType>;
  EnvironmentMember?: EnvironmentMemberResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ApolloContext> = Resolvers<ContextType>;
