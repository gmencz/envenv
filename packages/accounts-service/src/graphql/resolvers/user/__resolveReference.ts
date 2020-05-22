import { UserResolvers, User } from '../../generated';

const __resolveReference: UserResolvers['__resolveReference'] = async (
  { id },
  { prisma }
) => {
  const wantedUser = await prisma.user.findOne({ where: { id } });

  return wantedUser as User;
};

export default __resolveReference;
