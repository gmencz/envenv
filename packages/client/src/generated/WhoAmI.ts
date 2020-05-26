/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WhoAmI
// ====================================================

export interface WhoAmI_me_environments {
  __typename: 'Environment';
  /**
   * The unique id of the environment.
   */
  id: string;
  /**
   * The name of the environment.
   */
  name: string;
}

export interface WhoAmI_me {
  __typename: 'User';
  /**
   * The name of the user.
   */
  name: string;
  /**
   * The username of the user.
   */
  username: string;
  /**
   * The email of the user.
   */
  email: string | null;
  /**
   * The picture / profile picture of the user.
   */
  picture: string | null;
  /**
   * The environments which the user owns.
   */
  environments: (WhoAmI_me_environments | null)[] | null;
}

export interface WhoAmI {
  /**
   * Look up the currently logged in user.
   */
  me: WhoAmI_me;
}
