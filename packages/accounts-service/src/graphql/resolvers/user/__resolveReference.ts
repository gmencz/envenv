import { User } from '@prisma/client';
import { ApolloContext } from '../../../typings';

const __resolveReference = async (user: User, { prisma }: ApolloContext) => {
  const wantedUser = await prisma.user.findOne({ where: { id: user.id } });

  return wantedUser;
};

export default __resolveReference;
