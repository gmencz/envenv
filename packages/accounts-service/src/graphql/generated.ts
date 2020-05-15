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

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  requestPasswordResetEmail: Scalars['Boolean'];
  findUser?: Maybe<User>;
};

export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};

export type QueryRequestPasswordResetEmailArgs = {
  email: Scalars['String'];
};

export type QueryFindUserArgs = {
  id: Scalars['Int'];
};

export type _Entity = User;

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
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
