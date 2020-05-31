const tasks = arr => arr.join(' && ');
const { readdir, stat } = require('fs').promises;
const { join } = require('path');

const federatedServices = async path => {
  let dirs = [];
  for (const file of await readdir(path)) {
    if ((await stat(join(path, file))).isDirectory()) {
      dirs = [...dirs, file];
    }
  }
  return dirs;
};

federatedServices().then(r => console.log(r));

module.exports = {
  'hooks': {
    'pre-commit': 'lint-staged',
    'post-commit': tasks([]),
  },
};
