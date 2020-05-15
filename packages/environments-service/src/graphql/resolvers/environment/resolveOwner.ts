import { Environment } from '@prisma/client';

const resolveOwner = (environment: Environment) => {
  console.log('resolveOwner operation');
  return { __typename: 'User', id: environment.ownerUserId };
};

export default resolveOwner;
