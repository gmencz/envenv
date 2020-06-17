import { UserResolvers, User } from '../../generated';
import { getCachedUser } from '../../../helpers/cache/user';

const __resolveReference: UserResolvers['__resolveReference'] = async (
  { id },
  { userLoader }
) => {
  const cachedUser = await getCachedUser(id);

  if (cachedUser) {
    return cachedUser as User;
  }

  const user = userLoader.load(id);
  return (user as unknown) as User;
};

export default __resolveReference;
