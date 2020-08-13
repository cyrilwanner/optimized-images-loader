import path from 'path';
import { exec } from 'child_process';
import express from 'express';
import { getTests } from './utils';

const app = express();
const port = 3000;

const tests = getTests();

app.get('/', (req, res) => {
  res.send(tests.map((test) => `<a href="/${test}">${test}</a>`).join('<br />'));
});

tests.forEach((test) => {
  app.use(`/${test}`, express.static(path.resolve(__dirname, 'web', test, 'out')));
});

app.listen(port, () => {
  console.log(`Tests available at http://localhost:${port}`); // eslint-disable-line

  const cypress = exec(`FORCE_COLOR=1 npm run test:e2e:cypress${process.env.WATCH === 'true' ? ':watch' : ''}`, {
    cwd: path.resolve(__dirname, '..', '..'),
  });

  cypress.on('exit', (code: number) => process.exit(code));
  cypress.stdout?.pipe(process.stdout);
  cypress.stderr?.pipe(process.stderr);
});
