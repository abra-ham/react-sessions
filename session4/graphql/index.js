require('dotenv').config();

const express = require('express');
const graphQLHTTP = require('express-graphql');
const cors = require('cors');

const schema = require('./schema');
const PokeAPIClient = require('./services/PokeAPIClient');
const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphQLHTTP(() => {
    const apiClient = new PokeAPIClient();

    return {
      context: {
        apiClient,
      },
      schema,
      graphiql: true,
    };
  })
);

app.listen(port, () => console.log('listening on:', port));
