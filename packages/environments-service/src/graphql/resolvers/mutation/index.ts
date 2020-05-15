import createEnvironment from './createEnvironment';
import { CreateEnvironmentResolvableReturnType } from './createEnvironment';
import { MutationCreateEnvironmentArgs } from '../../generated';
import { ApolloContext } from '../../../typings';

export interface MutationOperations {
  createEnvironment(
    root: any,
    args: MutationCreateEnvironmentArgs,
    ctx: ApolloContext
  ): Promise<CreateEnvironmentResolvableReturnType>;
}

const MutationResolvers: MutationOperations = {
  createEnvironment,
};

export default MutationResolvers;
