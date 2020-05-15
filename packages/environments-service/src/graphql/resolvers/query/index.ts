import { QueryResolvers } from '../../generated';
import getEnvironments from './getEnvironments';

const Query: QueryResolvers = {
  getEnvironments,
};

export default Query;
