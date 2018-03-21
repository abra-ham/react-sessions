import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ExpandButton, Name, Card, Image, DetailsList, DetailItem } from './PokemonDetails.styled';

class PokemonDetails extends Component {
  state = {
    expanded: false,
  };

  onClick = () => {
    this.setState({ expanded: true });
  };

  render() {
    const { pokemonQuery } = this.props;
    console.log('pokemonQuery', pokemonQuery);
    const { pokemon, loading } = pokemonQuery;

    if (loading) return <div>Holaaaa</div>;

    const { image, name, number, classification, fleeRate, maxCP } = pokemon;
    return (
      <Card>
        <Image src={image} />
        <Name>{name}</Name>
        <DetailsList>
          <DetailItem>Number: {number}</DetailItem>
          <DetailItem>Class: {classification}</DetailItem>
          <DetailItem>Flee Rate: {fleeRate}</DetailItem>
          <DetailItem>Max CP: {maxCP}</DetailItem>
        </DetailsList>
      </Card>
    );
  }
}

const POKEMON_QUERY = gql`
  query($id: String) {
    pokemon(id: $id) {
      image
      name
      number
      classification
      fleeRate
      maxCP
    }
  }
`;

export default graphql(POKEMON_QUERY, {
  name: 'pokemonQuery',
  options: ({ id }) => {
    return {
      variables: {
        id,
      },
    };
  },
})(PokemonDetails);
