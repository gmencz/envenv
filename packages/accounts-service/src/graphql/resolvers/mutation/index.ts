import signup from './signup';
import signupWithGithub from './signupWithGithub';
import login from './login';
import loginWithExternalProvider from './loginWithExternalProvider';
import resetPassword from './resetPassword';
import deleteAllUsers from './deleteAllUsers';
import { MutationResolvers } from '../../generated';

const MutationResolvers: MutationResolvers = {
  signup,
  signupWithGithub,
  login,
  loginWithExternalProvider,
  resetPassword,
  deleteAllUsers,
};

export default MutationResolvers;
