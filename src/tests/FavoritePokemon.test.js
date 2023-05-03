import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { FavoritePokemon /* PokemonDetails */ } from '../pages';
import pokemonList from '../data';

describe('Testing Favorites', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  it('Test message No Favorite Pokemon Found if theres no favorite pokemon', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);

    const favoriteTitle = screen.getByText(/No favorite Pokémon found/i);

    expect(favoriteTitle).toBeInTheDocument();
  });

  it('Test if the favorite pokemon appears in the list', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [pokemonList[1]] } />);

    screen.getByText(/Charmander/i);
  });
});
