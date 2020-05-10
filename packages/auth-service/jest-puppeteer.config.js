/* eslint-disable no-undef */
const DEBUG_MODE = process.argv.includes('--debug');

const debugLaunchOptions = DEBUG_MODE
  ? {
      headless: true,
      slowMo: 100,
    }
  : {};

module.exports = {
  launch: {
    args: [
      // Required for Docker version of Puppeteer.
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
    ],
    ...debugLaunchOptions,
  },
};
