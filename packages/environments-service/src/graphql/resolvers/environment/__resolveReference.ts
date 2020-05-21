import { EnvironmentOperations } from '.';

const __resolveReference: EnvironmentOperations['__resolveReference'] = async (
  environment,
  { prisma }
) => {
  const wantedEnvironment = await prisma.environment.findOne({
    where: { id: environment.id },
  });

  return wantedEnvironment;
};

export default __resolveReference;
