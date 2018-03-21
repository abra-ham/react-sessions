import React, { Component } from 'react';
import Pokemon from '../Pokemon';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Container } from './List.styled';

class PokemonList extends Component {
  render() {
    const { pokemonData, onSelect } = this.props;
    if (!pokemonData) return null;
    if (pokemonData.loading) return <div>Loading...</div>;

    const { pokemons } = pokemonData;
    return (
      <Container>
        {pokemons.map(pokemon => (
          <Pokemon
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            number={pokemon.number}
            name={pokemon.name}
            onSelect={onSelect}
          />
        ))}
      </Container>
    );
  }
}

const POKEMONS_QUERY = gql`
  query GetPokemon {
    pokemons(first: 151) {
      id
      name
      number
      image
      classification
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      attacks {
        fast {
          name
        }
        special {
          name
        }
      }
      fleeRate
    }
  }
`;

export default graphql(POKEMONS_QUERY, { name: 'pokemonData' })(PokemonList);
