import path from 'path';
import express from 'express';
import { getTests } from './utils';

const app = express();
const port = 3000;

const tests = getTests();

app.get('/', (req, res) => {
  res.send(tests.map((test) => `<a href="/${test}">${test}</a>`).join('<br />'));
});

tests.forEach((test) => {
  app.use(`/${test}`, express.static(path.resolve(__dirname, test, 'out')));
});

app.listen(port, () => {
  console.log(`Tests available at http://localhost:${port}`); // eslint-disable-line
});
