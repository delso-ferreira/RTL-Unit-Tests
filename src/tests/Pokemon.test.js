import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';

describe('Testing the Pokemon Page', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  it('Testing Pokemon Card', () => {
    renderWithRouter(<App pokemonList={ [pokemonList[0]] } />);

    const nameText = screen.getByText(/pikachu/i);
    const elementText = screen.getByTestId('pokemon-type');
    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });
    const weight = screen.getByText('Average weight: 6.0 kg');

    expect(nameText).toBeInTheDocument();
    expect(elementText.innerHTML).toBe('Electric');
    expect(weight).toBeInTheDocument();
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg.alt).toBe('Pikachu sprite');
  });

  it('Should have a link to More Details wit the pokemon id that is being shown in the screen', () => {
    const { history } = renderWithRouter(<App pokemonList={ [pokemonList[0]] } />);

    const detailLink = screen.getByRole('link', {
      name: /more details/i });
    expect(detailLink).toBeInTheDocument();

    userEvent.click(detailLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  it('Should have a star icon in the favorites pokemons', () => {
    renderWithRouter(<App pokemonList={ [pokemonList[0]] } />);

    const detailLink = screen.getByRole('link', {
      name: /more details/i });
    expect(detailLink).toBeInTheDocument();

    userEvent.click(detailLink);

    const checkFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i });
    expect(checkFavorite).toBeInTheDocument();

    userEvent.click(checkFavorite);

    const starImage = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starImage).toBeInTheDocument();
    expect(starImage.alt).toBe('Pikachu is marked as favorite');
    expect(starImage.src).toBe('http://localhost/star-icon.svg');
  });
});
