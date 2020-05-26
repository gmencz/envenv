module.exports = {
  client: {
    service: `envenv-main-graph@development`, // "development" is the graph variant we're using
    includes: ['./packages/client/src/**/*.{ts,tsx,js,jsx,graphql}'],
  },
};
