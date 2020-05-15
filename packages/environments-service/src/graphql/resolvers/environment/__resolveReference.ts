import { Environment } from '@prisma/client';
import { ApolloContext } from '../../../typings';

const __resolveReference = async (
  environment: Environment,
  { prisma }: ApolloContext
) => {
  const wantedEnvironment = await prisma.environment.findOne({
    where: { id: environment.id },
  });

  return wantedEnvironment;
};

export default __resolveReference;
