/*
  Whenever we want to push our service to AGM, we have to do it in the running container
  because we're making use of its environment variables, so bash into the container and run
  "npm run apollo-push:<environment>", environment being "dev" or "prod" or "test" or some other
  environment.
*/
module.exports = {
  service: {
    name: 'envenv-main-graph',
    endpoint: {
      url: process.env.GRAPHQL_ENDPOINT,
    },
  },
};
