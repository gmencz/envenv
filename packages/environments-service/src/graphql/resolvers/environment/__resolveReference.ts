import { EnvironmentResolvers, Environment } from '../../generated';

const __resolveReference: EnvironmentResolvers['__resolveReference'] = async (
  { id },
  { environmentLoader }
) => {
  const environment = await environmentLoader.load(id);

  return (environment as unknown) as Environment;
};

export default __resolveReference;
