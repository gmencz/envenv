import dotenv from 'dotenv';
dotenv.config();
import initExpress, { start } from './helpers/express';
import { PrismaClient } from '@prisma/client';
import { initApolloFederatedService } from '@envenv/common';
import resolvers from './graphql/resolvers';
import { join } from 'path';
import permissions from './graphql/permissions';

async function main(): Promise<void> {
  if (process.env.APOLLO_KEY) {
    process.env.APOLLO_KEY = undefined;
  }

  const app = initExpress();
  const prisma = new PrismaClient();
  console.log(__dirname);
  await initApolloFederatedService(
    app,
    prisma,
    resolvers,
    join(__dirname, 'graphql/schemas'),
    permissions
  );

  start(app);
}

main().catch(err => console.error(err));
