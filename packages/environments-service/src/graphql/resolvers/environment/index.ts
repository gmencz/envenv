import { Environment } from '@prisma/client';
import { ApolloContext } from '../../../typings';
import __resolveReference from './__resolveReference';
import { ReferencedUserRoot } from '../user';
import { CreateEnvironmentResolvableReturnType } from '../mutation/';
import resolveOwner from './resolveOwner';
import { EnvironmentResolvers } from '../../generated';

export interface ReferencedEnvironmentRoot {
  __typename: 'Environment';
  id: number;
}

export interface EnvironmentOperations {
  __resolveReference(
    root: ReferencedEnvironmentRoot,
    ctx: ApolloContext
  ): Promise<Environment | null>;
  owner(environment: CreateEnvironmentResolvableReturnType): ReferencedUserRoot;
}

const EnvironmentResolvers: {
  [T in keyof EnvironmentResolvers]: EnvironmentOperations[keyof EnvironmentOperations];
} = {
  ['__resolveReference' as keyof EnvironmentResolvers]: __resolveReference,
  owner: resolveOwner,
};

export default EnvironmentResolvers;
