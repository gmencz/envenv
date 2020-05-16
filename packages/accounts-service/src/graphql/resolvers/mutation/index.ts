import signup from './signup';
import { AuthResponse, MutationSignupArgs } from '../../generated';
import { ApolloContext } from '../../../typings';

export interface MutationOperations {
  signup(
    root: any,
    args: MutationSignupArgs,
    ctx: ApolloContext
  ): Promise<AuthResponse>;
}

const MutationResolvers: MutationOperations = {
  signup,
};

export default MutationResolvers;
