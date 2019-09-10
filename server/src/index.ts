import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';
import  { Prisma } from 'prisma-binding';
import * as jwt from 'jsonwebtoken';
import { importSchema } from 'graphql-import';
const fs = require('fs');
const cookieParser = require('cookie-parser');

import * as path from "path";

declare global {
  namespace Express {
    export interface Request {
        userId?: string
        user?: string
    }
  }
}

// create schema prep file for zeit now deploy
// to fix error: handling the import '../generated/prisma.graphql' as dependency
const text = importSchema('./src/schema/schema.graphql');
fs.writeFileSync('./src/schema/schema_prep.graphql', text);

const db = new Prisma({
  typeDefs: path.join(__dirname, '/generated/prisma.graphql'),
  endpoint: process.env.PRISMA_ENDPOINT || 'http://192.168.99.100:4080',
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
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
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Origin', process.env.CLIENT_ENDPOINT);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const options = {
  port: `${process.env.APP_PORT}`,
  endpoint: '/',
  playground: '/',
  cors: {
    // origin: [process.env.CLIENT_ENDPOINT], // Client Endpoint
    origin: '*',
    credentials: true,
  }
}

server.start(options, ({ port }) => console.log(`[SERVER] is up and running on http://localhost:${port}`));
