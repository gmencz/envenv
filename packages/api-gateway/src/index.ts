import initExpress, { start } from './helpers/express';
import initGateway from './helpers/gateway';

try {
  const app = initExpress();
  initGateway(app);
  start(app);
} catch (error) {
  console.error(error);
}
