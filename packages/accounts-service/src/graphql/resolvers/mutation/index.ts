import signup from './signup';
import {
  MutationSignupArgs,
  MutationResolvers,
  SignupResult,
  SignupWithExternalProviderResult,
  MutationSignupWithExternalProviderArgs,
  MutationLoginArgs,
  LoginResult,
} from '../../generated';
import { ApolloContext } from '../../../typings';
import signupWithExternalProvider from './signupWithExternalProvider';
import login from './login';

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
}

const MutationResolvers: {
  [T in keyof MutationResolvers]: MutationOperations[keyof MutationOperations];
} = {
  signup,
  signupWithExternalProvider,
  login,
};

export default MutationResolvers;
