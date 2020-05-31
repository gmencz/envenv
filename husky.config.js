const runTasks = arrOfTasks => arrOfTasks.join(' && ');

module.exports = {
  'hooks': {
    'post-commit': runTasks([
      'docker-compose exec dev-accounts-service bash',
      'npm run apollo-push:dev',
      'exit',
      'docker-compose exec dev-environments-service bash',
      'npm run apollo-push:dev',
      'exit',
    ]),
  },
};
