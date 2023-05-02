import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { About } from '../pages';

describe('Testing About Page', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  it('the page contains a heading with the title about pokedex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('the page contains two paragraphs about the Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexTextOne = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);

    expect(pokedexTextOne).toBeInTheDocument();

    const pokedexTextTwo = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);

    expect(pokedexTextTwo).toBeInTheDocument();
  });

  it('should have the image of a pokemon with the exact text', () => {
    renderWithRouter(<About />);
    const pokeImage = screen.getByAltText(/Pokédex/i);

    expect(pokeImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
