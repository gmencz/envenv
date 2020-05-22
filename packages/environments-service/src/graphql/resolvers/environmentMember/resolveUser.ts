import { EnvironmentMemberResolvers } from '../../generated';
import { EnvironmentMember } from '@prisma/client';

const resolveUser: EnvironmentMemberResolvers['user'] = environmentMember => {
  const wantedEnvironment = (environmentMember as unknown) as EnvironmentMember;

  return { __typename: 'User', id: wantedEnvironment.userId };
};

export default resolveUser;
