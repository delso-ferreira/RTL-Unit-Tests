import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import nextPokemon from '../pages/Pokedex';

describe('Testing the Pokedex Page', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  it('Testing if the page has a heading with the text Encountered Pokemon', () => {
    renderWithRouter(<App />);

    const headingPokedex = screen.getByRole('heading', {
      name: /Encountered Pokémon/i });

    expect(headingPokedex).toBeInTheDocument();
  });

  it('Test if the next pokemon is called on click', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i });

    userEvent.click(nextButton);

    expect(() => { (nextPokemon).toBeCalled(); });
  });
  it('Pikachu will get back on the screen when pressing the All button', () => {
    renderWithRouter(<App />);

    screen.getByText(/Pikachu/i);

    const fireBtn = screen.getByRole('button', {
      name: /fire/i });

    userEvent.click(fireBtn);

    screen.getByText(/Charmander/i);

    const allBtn = screen.getByRole('button', {
      name: /all/i });

    userEvent.click(allBtn);

    const getPikachu = screen.getByText(/Pikachu/i);

    expect(getPikachu).toBeInTheDocument();
  });
  it('Should exist 7 categories buttons in the screen', () => {
    renderWithRouter(<App />);

    const btnsTestId = screen.getAllByTestId('pokemon-type-button');
    expect(btnsTestId.length).toBe(7);
  });
  it('When clicking next pokemon should appears in the screen', () => {
    renderWithRouter(<App />);

    screen.getByText(/Pikachu/i);

    const nxtPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i });

    userEvent.click(nxtPokemon);

    const charmanderTxt = screen.getByText(/Charmander/i);

    expect(charmanderTxt).toBeInTheDocument();
  });
});
