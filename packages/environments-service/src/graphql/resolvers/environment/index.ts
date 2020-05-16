import { Environment } from '@prisma/client';
import { ApolloContext } from '../../../typings';
import __resolveReference from './__resolveReference';
import { ReferencedUserRoot } from '../user';
import { CreateEnvironmentResolvableReturnType } from '../mutation/';
import resolveOwner from './resolveOwner';

export interface ReferencedEnvironmentRoot {
  __typename: 'Environment';
  id: number;
}

export interface EnvironmentOperations {
  __resolveReference(
    root: ReferencedEnvironmentRoot,
    ctx: ApolloContext
  ): Promise<Environment | null>;
  resolveOwner(
    environment: CreateEnvironmentResolvableReturnType
  ): ReferencedUserRoot;
}

const EnvironmentResolvers: EnvironmentOperations = {
  __resolveReference,
  resolveOwner,
};

export default EnvironmentResolvers;
