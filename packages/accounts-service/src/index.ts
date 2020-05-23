import initExpress, { start } from './helpers/initExpress';
import initApolloFederatedService from './helpers/initApolloFederatedService';
import { PrismaClient } from '@prisma/client';

async function main(): Promise<void> {
  const app = initExpress();
  const prisma = new PrismaClient();
  await initApolloFederatedService(app, prisma);
  start(app);
}

main().catch(err => console.error(err));
