import { buildBarebonesFederatedService } from '@envenv/common';
import { join } from 'path';

const graphqlSchemasPath = join(__dirname, '../graphql/schemas');
buildBarebonesFederatedService(graphqlSchemasPath, 5000);
