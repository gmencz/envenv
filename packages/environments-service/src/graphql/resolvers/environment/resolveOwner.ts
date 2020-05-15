import { EnvironmentOperations } from '.';

const resolveOwner: EnvironmentOperations['resolveOwner'] = environment => {
  return { __typename: 'User', id: environment.ownerUserId };
};

export default resolveOwner;
