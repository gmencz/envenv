import { EnvironmentMember } from '@prisma/client';

const resolveUser = (environmentMember: EnvironmentMember) => {
  return { __typename: 'User', id: environmentMember.userId };
};

export default resolveUser;
