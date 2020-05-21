import { EnvironmentOperations } from '.';

const resolveOwner: EnvironmentOperations['owner'] = environment => {
  return { __typename: 'User', id: environment.ownerUserId };
};

export default resolveOwner;
