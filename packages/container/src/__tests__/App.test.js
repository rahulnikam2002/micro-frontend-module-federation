// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the remotes for Jest
jest.mock('remote/Header', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header">Mock Header</div>,
}));

jest.mock('footer/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-footer">Mock Footer</div>,
}));

import App from '../App'; // Import AFTER mocking

describe('App', () => {
  test('renders lazy-loaded Header and Footer with Suspense', async () => {
    render(<App />);

    // Check Suspense fallback
    expect(screen.getByText(/loading header/i)).toBeInTheDocument();
    expect(screen.getByText(/loading footer/i)).toBeInTheDocument();

    // Wait for lazy-loaded components
    const header = await screen.findByTestId('mock-header');
    const footer = await screen.findByTestId('mock-footer');

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
