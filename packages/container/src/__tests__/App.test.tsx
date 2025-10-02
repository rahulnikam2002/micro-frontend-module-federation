// App.test.tsx
import React from 'react';
import "@testing-library/jest-dom";
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

// Mock GlobalButton used by App
jest.mock(
  'footer/GlobalButton',
  () => ({
    __esModule: true,
    default: () => <button data-testid="mock-global-button">Mock Button</button>,
  }),
  { virtual: true }
);

import App from '../App'; // Import AFTER mocking

describe('App', () => {
  test('renders lazy-loaded Header and Footer with Suspense', async () => {
    render(<App />);

    // Check Suspense fallback
    expect(screen.getByText(/loading header/i)).toBeInTheDocument();
    expect(screen.getByText(/loading footer/i)).toBeInTheDocument();
    expect(screen.getByText(/loading button/i)).toBeInTheDocument();

    // Wait for lazy-loaded components
    const header = await screen.findByTestId('mock-header');
    const footer = await screen.findByTestId('mock-footer');
    const button = await screen.findByTestId('mock-global-button');

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('renders components in the correct order and matches snapshot', async () => {
    const { container } = render(<App />);

    // Wait for lazy-loaded components to resolve
    const header = await screen.findByTestId('mock-header');
    const footer = await screen.findByTestId('mock-footer');
    const button = await screen.findByTestId('mock-global-button');

    // Ensure the order inside .App is Header, Button, Footer
    const appDiv = container.querySelector('.App');
    expect(appDiv).toBeInTheDocument();
    const children = Array.from(appDiv!.children).filter(
      (n) => n.nodeType === Node.ELEMENT_NODE
    );

  // Find indexes (use the actual nodes rendered inside .App)
  const idxHeader = children.indexOf(header as Element);
  const idxButton = children.indexOf(button as Element);
  const idxFooter = children.indexOf(footer as Element);

    // The header should come before the button, and button before footer
    expect(idxHeader).toBeGreaterThanOrEqual(0);
    expect(idxButton).toBeGreaterThanOrEqual(0);
    expect(idxFooter).toBeGreaterThanOrEqual(0);
    expect(idxHeader).toBeLessThan(idxButton);
    expect(idxButton).toBeLessThan(idxFooter);

    // Snapshot the rendered output for extra coverage
    expect(appDiv).toMatchSnapshot();
  });
});
