import signup from './signup';
import login from './login';
import resetPassword from './resetPassword';
import deleteAllUsers from './deleteAllUsers';
import { MutationResolvers } from '../../generated';

const MutationResolvers: MutationResolvers = {
  signup,
  login,
  resetPassword,
  deleteAllUsers,
};

export default MutationResolvers;
