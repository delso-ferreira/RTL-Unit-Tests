import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing App Page', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  it('first link should have the name Home', () => {
    renderWithRouter(<App />);

    const homeTitle = screen.getByText(/Home/i);
    expect(homeTitle).toBeInTheDocument();
  });

  it('second link should have the name About', () => {
    renderWithRouter(<App />);
    const aboutTitle = screen.getByText(/About/i);
    expect(aboutTitle).toBeInTheDocument();
  });

  it('third link should have the name Favorite Pokemon', () => {
    renderWithRouter(<App />);
    const favoriteTitle = screen.getByText(/favorite pokémon/i);
    expect(favoriteTitle).toBeInTheDocument();
  });

  it('clicking in Home should be redirect to the root page', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i });

    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('clicking in the About should redirect to /about page', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /About/i });

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('clicking in the Pokémon Favoritados should be redirect to /favorites page', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('clicking in an unknown page should redirect to a Not Found page', () => {
    const { history } = renderWithRouter(<App />);
    const notFoundLink = '/page-not-found';
    act(() => { history.push(notFoundLink); });

    const notFoundHeading = screen.getByText(/page requested not found/i);
    expect(notFoundHeading).toBeInTheDocument();
  });
});
