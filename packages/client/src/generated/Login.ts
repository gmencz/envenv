/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_SuccessfulLogin {
  __typename: 'SuccessfulLogin';
  /**
   * The CSRF token for the started session.
   */
  csrfToken: string;
}

export interface Login_login_InvalidCredentials {
  __typename: 'InvalidCredentials';
  /**
   * A detailed explanation of why the credentials were invalid.
   */
  message: string;
}

export interface Login_login_InvalidDataFormat {
  __typename: 'InvalidDataFormat';
  /**
   * A detailed explanation of why the data was invalid and which piece of the data caused the issue.
   */
  message: string;
}

export type Login_login =
  | Login_login_SuccessfulLogin
  | Login_login_InvalidCredentials
  | Login_login_InvalidDataFormat;

export interface Login {
  /**
   * Logs user in.
   */
  login: Login_login;
}

export interface LoginVariables {
  username: string;
  password: string;
}
