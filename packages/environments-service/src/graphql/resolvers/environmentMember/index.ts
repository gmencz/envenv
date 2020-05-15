import { EnvironmentMember } from '@prisma/client';
import { ApolloContext } from '../../../typings';
import __resolveReference from './__resolveReference';
import { ReferencedUserRoot } from '../user';
import resolveUser from './resolveUser';

export interface ReferencedEnvironmentMemberRoot {
  __typename: 'EnvironmentMember';
  id: number;
}

export interface EnvironmentMemberOperations {
  __resolveReference(
    root: ReferencedEnvironmentMemberRoot,
    ctx: ApolloContext
  ): Promise<EnvironmentMember | null>;
  resolveUser(
    environmentMember: Pick<EnvironmentMember, 'userId'> & {
      __typename: 'User';
    }
  ): ReferencedUserRoot;
}

const EnvironmentMemberResolvers: EnvironmentMemberOperations = {
  __resolveReference,
  resolveUser,
};

export default EnvironmentMemberResolvers;
