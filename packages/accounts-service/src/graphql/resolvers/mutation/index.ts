import signup from './signup';
import signupWithExternalProvider from './signupWithExternalProvider';
import login from './login';
import loginWithExternalProvider from './loginWithExternalProvider';
import resetPassword from './resetPassword';
import deleteAllUsers from './deleteAllUsers';
import { MutationResolvers } from '../../generated';

const MutationResolvers: MutationResolvers = {
  signup,
  signupWithExternalProvider,
  login,
  loginWithExternalProvider,
  resetPassword,
  deleteAllUsers,
};

export default MutationResolvers;
