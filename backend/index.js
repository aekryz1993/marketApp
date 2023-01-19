import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import { getUserId, getUserAuth } from "./utils";

const prisma = new PrismaClient();
export const pubsub = new PubSub();

async function main() {
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscription",
  });

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx) => {
        const userId = await getUserId(ctx);
        return {
          userId,
        };
      },
      onDisconnect() {
        console.log("Disconnected!");
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    context: async ({ req }) => {
      const userAuth = await getUserAuth(req);
      return {
        ...req,
        prisma,
        pubsub,
        userId: userAuth ? userAuth.userId : null,
        token: userAuth ? userAuth.token : null,
        expiresIn: userAuth ? userAuth.expiresIn : null,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer,
      }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      credentials: true,
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:3000",
        "http://192.168.100.10:3000",
      ],
    },
  });

  await new Promise((resolve) =>
    httpServer.listen(
      {
        port: process.env.PORT || 4000,
      },
      resolve
    )
  );
  console.log(
    `🚀 Server ready at http://${process.env.HOST || 'localhost'}:${process.env.PORT || 4000}${
      server.graphqlPath
    }`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
