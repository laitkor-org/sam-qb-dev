const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { createPool } = require('mysql2/promise');

const app = express();

const typeDefs = gql`
  type User {
    Record_Owner: String
    Client_Name : String
    Status_Old: String
    Market: String
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const connection = await createPool({
        host: '52.8.52.89', // Replace with your MySQL host
        user: 'quickbase',    // Replace with your MySQL username
        password: 'm2n1shlko', // Replace with your MySQL password
        database: 'qbdb3', // Replace with your MySQL database name
      });

      const [rows] = await connection.query('SELECT * FROM qbtable1');
      connection.end();

      return rows;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`GraphQL server is running on http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();
