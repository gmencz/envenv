import { QueryResolvers } from '../../generated';
import requestPasswordResetEmail from './requestPasswordResetEmail';
import findUser from './findUser';

const Query: QueryResolvers = {
  requestPasswordResetEmail,
  findUser,
};

export default Query;
