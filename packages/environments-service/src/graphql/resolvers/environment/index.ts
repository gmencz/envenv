import __resolveReference from './__resolveReference';
import resolveOwner from './resolveOwner';
import { EnvironmentResolvers } from '../../generated';

const EnvironmentResolvers: EnvironmentResolvers = {
  __resolveReference,
  owner: resolveOwner,
};

export default EnvironmentResolvers;
