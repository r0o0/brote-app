import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';
import  { Prisma } from 'prisma-binding';

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
      debug: true,
    }),
  }),
});

server.get("/posts", (req, res) => {
   res.json({}).status(200)
});

const options = {
  port: `${process.env.APP_PORT}`,
}

server.start(options, ({ port }) => console.log(`[SERVER] is up and running on http://localhost:${port}`));

export { server }