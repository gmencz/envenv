import signup from './signup';
import {
  AuthResponse,
  MutationSignupArgs,
  MutationResolvers,
} from '../../generated';
import { ApolloContext } from '../../../typings';

export interface MutationOperations {
  signup(
    root: any,
    args: MutationSignupArgs,
    ctx: ApolloContext
  ): Promise<AuthResponse>;
}

const MutationResolvers: {
  [T in keyof MutationResolvers]: MutationOperations[keyof MutationOperations];
} = {
  signup,
};

export default MutationResolvers;
