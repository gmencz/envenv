import initExpress, { start } from './helpers/express';
import initApolloFederatedService from './helpers/initApolloFederatedService';
import { PrismaClient } from '@prisma/client';

async function main(): Promise<void> {
  if (process.env.APOLLO_KEY) {
    process.env.APOLLO_KEY = undefined; //
  }

  const app = initExpress();
  const prisma = new PrismaClient();
  await initApolloFederatedService(app, prisma);
  start(app);
}

main().catch(err => console.error(err));
