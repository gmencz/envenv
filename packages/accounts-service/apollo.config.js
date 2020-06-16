require('dotenv').config();
module.exports = {
  service: {
    name: 'envenv-main-graph',
    endpoint: {
      url: 'http://localhost:5000/graphql',
    },
  },
};
