import signup from './signup';
import login from './login';
import resetPassword from './resetPassword';
import deleteAllUsers from './deleteAllUsers';
import { MutationResolvers } from '../../generated';
import logout from './logout';

const MutationResolvers: MutationResolvers = {
  signup,
  login,
  resetPassword,
  deleteAllUsers,
  logout,
};

export default MutationResolvers;
