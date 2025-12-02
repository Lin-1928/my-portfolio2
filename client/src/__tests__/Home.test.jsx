import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('renders Home title and paragraph', () => {
  render(<Home />);
  expect(screen.getByText('Welcome to My Portfolio!')).toBeInTheDocument();
  expect(screen.getByText('This is my personal website.')).toBeInTheDocument();
});
