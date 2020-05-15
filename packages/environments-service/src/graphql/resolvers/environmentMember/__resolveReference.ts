import { EnvironmentMember } from '@prisma/client';
import { ApolloContext } from '../../../typings';

const __resolveReference = async (
  environmentMember: EnvironmentMember,
  { prisma }: ApolloContext
) => {
  const wantedEnvironmentMember = await prisma.environmentMember.findOne({
    where: { id: environmentMember.id },
  });

  return wantedEnvironmentMember;
};

export default __resolveReference;
