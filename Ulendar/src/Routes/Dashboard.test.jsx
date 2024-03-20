import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard'; // adjust the import path as needed

describe('Dashboard', () => {
  test('renders Dashboard component', () => {
    render(<Dashboard />);
    // Check for a specific element in the Dashboard component
    // For example, you might check for a div with a specific style
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
});