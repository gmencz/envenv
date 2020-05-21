import { UserOperations } from '.';

const __resolveReference: UserOperations['__resolveReference'] = async (
  user,
  { prisma }
) => {
  const wantedUser = await prisma.user.findOne({ where: { id: user.id } });

  return wantedUser;
};

export default __resolveReference;
