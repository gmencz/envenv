const { readdirSync, statSync } = require('fs');
const { join } = require('path');

const tasks = arr => arr.join(' && ');

const findFederatedServices = path => {
  const files = readdirSync(join(path));
  const dirs = files.filter(file => statSync(join(path, file)).isDirectory());

  return dirs.filter(dir => {
    const folderFragments = dir.split('-');
    if (folderFragments[folderFragments.length - 1] === 'service') {
      return true;
    }

    return false;
  });
};

const apolloPushCmds = () => {
  const federatedServices = findFederatedServices(`${__dirname}/packages/`);

  const devPushCmds = federatedServices.map(
    federatedService =>
      `docker-compose exec -T dev-${federatedService} npm run apollo-push:dev`
  );

  return {
    dev: devPushCmds,
  };
};

module.exports = {
  'hooks': {
    'pre-commit': tasks(['lint-staged', ...apolloPushCmds().dev]),
  },
};
