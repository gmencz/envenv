import { EnvironmentMemberOperations } from '.';

const __resolveReference: EnvironmentMemberOperations['__resolveReference'] = async (
  environmentMember,
  { prisma }
) => {
  const wantedEnvironmentMember = await prisma.environmentMember.findOne({
    where: { id: environmentMember.id },
  });

  return wantedEnvironmentMember;
};

export default __resolveReference;
