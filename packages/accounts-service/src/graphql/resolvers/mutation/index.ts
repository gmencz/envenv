import signup from './signup';
import {
  MutationSignupArgs,
  MutationResolvers,
  SignupResult,
  SignupWithExternalProviderResult,
  MutationSignupWithExternalProviderArgs,
} from '../../generated';
import { ApolloContext } from '../../../typings';
import signupWithExternalProvider from './signupWithExternalProvider';

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
}

const MutationResolvers: {
  [T in keyof MutationResolvers]: MutationOperations[keyof MutationOperations];
} = {
  signup,
  signupWithExternalProvider,
};

export default MutationResolvers;
