module.exports = {
  client: {
    service: `envenv-main-graph@development`, // "development" is the graph variant we're using
    includes: ['./packages/client/src/**/*.{ts,tsx,js,jsx,graphql}'],
    excludes: ['./packages/client/src/generated/*.{tsx, ts}'], // exclude the generated types to avoid clashing
  },
};
