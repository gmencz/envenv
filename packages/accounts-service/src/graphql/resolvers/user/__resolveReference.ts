import { UserResolvers, User } from '../../generated';
import { getCachedUser } from '../../../helpers/cache/user';

const __resolveReference: UserResolvers['__resolveReference'] = async (
  { id },
  { prisma }
) => {
  const cachedUser = await getCachedUser(id);

  if (cachedUser) {
    return cachedUser as User;
  }

  const wantedUser = await prisma.user.findOne({ where: { id } });
  return wantedUser as User;
};

export default __resolveReference;
