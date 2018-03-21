const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = require('graphql');

const WeightType = new GraphQLObjectType({
  name: 'Weights',
  description: 'Peso del pinshi fokemon',
  fields: () => ({
    maximum: {
      type: GraphQLFloat,
      resolve: weight => parseFloat(weight.minimum),
    },
    minimum: {
      type: GraphQLFloat,
      resolve: weight => parseFloat(weight.minimum),
    },
  }),
});

const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'Pocket monster',
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLInt },
    classification: { type: GraphQLString },
    weight: { type: WeightType },
  }),
});

module.exports = PokemonType;
