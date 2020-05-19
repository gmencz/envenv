import signup from './signup';
import {
  MutationSignupArgs,
  MutationResolvers,
  SignupResult,
  SignupWithExternalProviderResult,
  MutationSignupWithExternalProviderArgs,
  MutationLoginArgs,
  LoginResult,
  LoginWithExternalProviderResult,
} from '../../generated';
import { ApolloContext } from '../../../typings';
import signupWithExternalProvider from './signupWithExternalProvider';
import login from './login';
import loginWithExternalProvider from './loginWithExternalProvider';

export interface MutationOperations {
  signup(
    root: any,
    args: MutationSignupArgs,
    ctx: ApolloContext
  ): Promise<SignupResult>;
  signupWithExternalProvider(
    root: any,
    args: MutationSignupWithExternalProviderArgs,
    ctx: ApolloContext
  ): Promise<SignupWithExternalProviderResult>;
  login(
    root: any,
    args: MutationLoginArgs,
    ctx: ApolloContext
  ): Promise<LoginResult>;
  loginWithExternalProvider(
    root: any,
    args: {},
    ctx: ApolloContext
  ): Promise<LoginWithExternalProviderResult>;
}

const MutationResolvers: {
  [T in keyof MutationResolvers]: MutationOperations[keyof MutationOperations];
} = {
  signup,
  signupWithExternalProvider,
  login,
  loginWithExternalProvider,
};

export default MutationResolvers;
