const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');
const PokemonJASON = require('../pokemon.json');
const PokemonType = require('./PokemonType');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Main query object',
  fields: () => ({
    pokemons: {
      type: PokemonType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (root, args, context) => {
        const pokemons = context.apiClient.getPokemonList();
        return pokemons.find(pokemon => pokemon.name === args.name);
      },
    },
  }),
});

module.exports = QueryType;
