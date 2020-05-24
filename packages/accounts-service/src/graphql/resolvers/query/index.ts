import requestPasswordResetEmail from './requestPasswordResetEmail';
import user from './user';
import { QueryResolvers } from '../../generated';
import me from './me';

const QueryResolvers: QueryResolvers = {
  requestPasswordResetEmail,
  user,
  me,
};

export default QueryResolvers;
