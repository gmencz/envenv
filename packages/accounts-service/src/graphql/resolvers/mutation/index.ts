import signup from './signup';
import {
  MutationSignupArgs,
  MutationResolvers,
  SignupResult,
} from '../../generated';
import { ApolloContext } from '../../../typings';

export interface MutationOperations {
  signup(
    root: any,
    args: MutationSignupArgs,
    ctx: ApolloContext
  ): Promise<SignupResult>;
}

const MutationResolvers: {
  [T in keyof MutationResolvers]: MutationOperations[keyof MutationOperations];
} = {
  signup,
};

export default MutationResolvers;
