import { getTests } from './utils';

(async (): Promise<void> => {
  const tests = getTests();

  try {
    await Promise.all(
      tests.map((test) => {
        const builder = require(`./${test}/build`).default; // eslint-disable-line
        return builder();
      }),
    );
  } catch (error) {
    console.error(error); // eslint-disable-line
    process.exit(1);
  }
})();
