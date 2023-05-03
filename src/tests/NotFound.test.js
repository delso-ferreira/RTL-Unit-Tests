import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { NotFound } from '../pages';

describe('Testing Not Found Component', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  it('Page contains a heading with text Page Request not Found', () => {
    renderWithRouter(<NotFound />);

    const notFoundHeading = screen.getByText(/page requested not found/i);
    expect(notFoundHeading).toBeInTheDocument();
  });

  it('Page shows the correct image', () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getByAltText(/pikachu crying because the page requested was not found/i);

    expect(notFoundImg.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
