import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
/* import { FavoritePokemon } from '../pages'; */

const pokepath = '/pokemon/25';

describe('Testing Pokemon Details page', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };
  it('Test whether the selected Pokémon detailed information is shown on the screen', () => {
    const { history } = renderWithRouter(<App pokemonlist={ [pokemonList[0]] } />);

    const detailBtn = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailBtn);

    const { pathname } = history.location;
    expect(pathname).toBe(pokepath);

    const headingText = screen.getByRole('heading', { name: /pikachu details/i });
    expect(headingText).toBeInTheDocument();

    const summaryBtn = screen.getByRole('heading', { name: /summary/i });
    expect(summaryBtn).toBeInTheDocument();

    const paragraph = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(paragraph).toBeInTheDocument();

    expect(detailBtn).not.toBeInTheDocument();
  });
  it('Test the maps of the current pokemon location', () => {
    const { history } = renderWithRouter(<App pokemonlist={ [pokemonList[0]] } />);

    const detailBtn = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailBtn);

    const { pathname } = history.location;
    expect(pathname).toBe(pokepath);

    const pokeLocations = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(pokeLocations).toBeInTheDocument();

    const locationOne = screen.getByText(/kanto viridian forest/i);
    const locationTwo = screen.getByText(/kanto power plant/i);
    expect(locationOne).toBeInTheDocument();
    expect(locationTwo).toBeInTheDocument();

    const altTxt = screen.getAllByAltText(/Pikachu location/i);

    const firstImage = altTxt[0].src;
    expect(firstImage).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');

    const secondImage = altTxt[1].src;
    expect(secondImage).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('The user should be able to favorite and remove favorite the Pokemon from the details page', () => {
    const { history } = renderWithRouter(<App pokemonlist={ [pokemonList[0]] } />);

    const detailBtn = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailBtn);

    const { pathname } = history.location;
    expect(pathname).toBe(pokepath);

    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkFavorite).toBeInTheDocument();

    userEvent.click(checkFavorite);

    const ischecked = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(ischecked).toBeInTheDocument();

    userEvent.click(checkFavorite);

    expect(ischecked).not.toBeInTheDocument();

    /* history.push('/favorites'); */
  });
});
