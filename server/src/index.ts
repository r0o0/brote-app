const cookieParser = require('cookie-parser');
import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';
import  { Prisma } from 'prisma-binding';
import * as jwt from 'jsonwebtoken';
import { importSchema } from 'graphql-import';
import * as path from "path";
import * as fs from 'fs';
require('newrelic');

declare global {
  namespace Express {
    export interface Request {
        userId?: string
        user?: string
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  // create schema prep file for zeit now deploy
  // to fix error: handling the import '../generated/prisma.graphql' as dependency
  const text = importSchema(__dirname + '/schema/schema.graphql');
  fs.writeFileSync(__dirname + '/schema/schema_prep.graphql', text);
}

const db = new Prisma({
  typeDefs: path.join(__dirname, '/generated/prisma.graphql'),
  endpoint: process.env.PRISMA_ENDPOINT || process.env.PRISMA_ENDPOINT_PROD,
  debug: true,
});

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, '/schema/schema_prep.graphql'),
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({ ...req, db }),
});

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next();
  if (token) {
    const { userId } = jwt.verify(token, process.env.AUTH_SECRET);
    // put the userId onto the req for future access
    req.userId = userId;
  }
  next();
});

server.express.use(async (req, res, next) => {
  // if no loggedIn user skip
  if (!req.userId) return next();
  const user = await db.query.user({
    where: { id: req.userId }
  });
  req.user = user;
  next();
});

server.get("/posts", (req, res) => {
   res.json({}).status(200)
});

server.express.use((req, res, next) => {
  var allowedOrigins = [process.env.CLIENT_ENDPOINT, 'http://localhost:9000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin as string) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Ori gin, X-Requested-With, Content-Type, Accept');
  next();
});

let options = {
  port: `${process.env.APP_PORT}`,
  endpoint: '/',
  playground: '/',
  cors: {
    origin: [process.env.CLIENT_ENDPOINT],
    credentials: true,
  }
}

console.log(options);
server.start(options, ({ port }) => console.log(`[SERVER] is up and running on http://localhost:${port}`));
