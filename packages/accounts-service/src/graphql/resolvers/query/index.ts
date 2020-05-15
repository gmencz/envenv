import { QueryResolvers } from '../../generated';
import requestPasswordResetEmail from './requestPasswordResetEmail';

const Query: QueryResolvers = {
  requestPasswordResetEmail,
};

export default Query;
