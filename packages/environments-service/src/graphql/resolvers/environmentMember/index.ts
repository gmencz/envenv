import { EnvironmentMember } from '@prisma/client';
import { ApolloContext } from '../../../typings';
import __resolveReference from './__resolveReference';
import { ReferencedUserRoot } from '../user';
import resolveUser from './resolveUser';
import { EnvironmentMemberResolvers } from '../../generated';

export interface ReferencedEnvironmentMemberRoot {
  __typename: 'EnvironmentMember';
  id: number;
}

export type EnvironmentMemberOperations = {
  __resolveReference(
    root: ReferencedEnvironmentMemberRoot,
    ctx: ApolloContext
  ): Promise<EnvironmentMember | null>;
  resolveUser(
    environmentMember: Pick<EnvironmentMember, 'userId'> & {
      __typename: 'User';
    }
  ): ReferencedUserRoot;
};

const EnvironmentMemberResolvers: {
  [T in keyof EnvironmentMemberResolvers]: EnvironmentMemberOperations[keyof EnvironmentMemberOperations];
} = {
  ['__resolveReference' as keyof EnvironmentMemberResolvers]: __resolveReference,
  user: resolveUser,
};

export default EnvironmentMemberResolvers;
