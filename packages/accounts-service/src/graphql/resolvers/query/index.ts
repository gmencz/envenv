import requestPasswordResetEmail from './requestPasswordResetEmail';
import user from './user';
import { QueryResolvers } from '../../generated';

const QueryResolvers: QueryResolvers = {
  requestPasswordResetEmail,
  user,
};

export default QueryResolvers;
