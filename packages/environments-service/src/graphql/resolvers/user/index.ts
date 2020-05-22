import resolveEnvironments from './resolveEnvironments';
import { UserResolvers } from '../../generated';

const UserResolvers: UserResolvers = {
  environments: resolveEnvironments,
};

export default UserResolvers;
