import schema from './graphql/schema';

import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { normalize } from 'path';

dotenv.config({ path: '.env' });

const dev = process.env.NODE_ENV !== 'production';
const port = normalize(process.env.PORT || '4000');
const touch = process.env.touch;
const app = express();
const server = new ApolloServer({ schema });

app.set('port', port);
app.use(cors());
app.use(morgan(dev ? 'dev' : 'combined'));
app.use(helmet({ contentSecurityPolicy: dev ? false : undefined }));
app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(server.getMiddleware({ cors: false }));

const running = app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://${process.env.HOST_NAME || 'localhost'}:${port}${server.graphqlPath} in ${
      process.env.NODE_ENV || 'development'
    }`
  );

  if (touch && running.close) {
    running.close();
    process.exit(0);
  }
});
