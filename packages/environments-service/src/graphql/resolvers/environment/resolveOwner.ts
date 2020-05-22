import { EnvironmentResolvers } from '../../generated';
import { Environment } from '@prisma/client';

const resolveOwner: EnvironmentResolvers['owner'] = environment => {
  const wantedEnvironment = (environment as unknown) as Environment;

  return { __typename: 'User', id: wantedEnvironment.ownerUserId };
};

export default resolveOwner;
