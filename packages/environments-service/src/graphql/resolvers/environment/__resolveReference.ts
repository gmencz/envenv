import { EnvironmentResolvers, Environment } from '../../generated';

const __resolveReference: EnvironmentResolvers['__resolveReference'] = async (
  { id },
  { prisma }
) => {
  const wantedEnvironment = await prisma.environment.findOne({
    where: { id },
  });

  return (wantedEnvironment as unknown) as Environment;
};

export default __resolveReference;
