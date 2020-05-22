import resolveUser from './resolveUser';
import { EnvironmentMemberResolvers } from '../../generated';

const EnvironmentMemberResolvers: EnvironmentMemberResolvers = {
  user: resolveUser,
};

export default EnvironmentMemberResolvers;
