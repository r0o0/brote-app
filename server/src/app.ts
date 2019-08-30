import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';
import  { Prisma } from 'prisma-binding';
import * as jwt from 'jsonwebtoken';
import * as cookieParser from 'cookie-parser';

declare global {
  namespace Express {
    export interface Request {
        userId?: string
        user?: string
    }
  }
}

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
  debug: true,
});

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
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
  cors: {
    origin: [process.env.CLIENT_ENDPOINT], // Client Endpoint
    credentials: true,
  }
}

server.start(options, ({ port }) => console.log(`[SERVER] is up and running on http://localhost:${port}`));
