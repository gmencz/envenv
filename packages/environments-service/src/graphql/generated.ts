export type Maybe<T> = T | null;
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
  environments?: Maybe<Array<Maybe<Environment>>>;
};
