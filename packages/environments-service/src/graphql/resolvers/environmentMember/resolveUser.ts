import { EnvironmentMemberOperations } from '.';

const resolveUser: EnvironmentMemberOperations['resolveUser'] = environmentMember => {
  return { __typename: 'User', id: environmentMember.userId };
};

export default resolveUser;
