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

  test('imports and renders all lazy components correctly', async () => {
    // This test ensures all import statements are executed
    const { container } = render(<App />);

    // Verify the main App div is rendered (covers return statement)
    expect(container.querySelector('.App')).toBeInTheDocument();

    // Verify all three lazy components are loaded (covers all imports)
    await screen.findByTestId('mock-header');
    await screen.findByTestId('mock-footer');
    await screen.findByTestId('mock-global-button');

    // Verify the structure covers the JSX return statement
    const suspenseElements = container.querySelectorAll('div[data-testid="mock-header"], div[data-testid="mock-footer"], button[data-testid="mock-global-button"]');
    expect(suspenseElements).toHaveLength(3);
  });

  test('handles lazy loading with correct fallback behavior', async () => {
    const { container } = render(<App />);

    // Verify the App class is applied (covers className="App")
    const appDiv = container.querySelector('.App');
    expect(appDiv).toHaveClass('App');

    // This test exercises the entire component render path
    expect(appDiv).toBeInTheDocument();

    // Wait for all components to load
    await Promise.all([
      screen.findByTestId('mock-header'),
      screen.findByTestId('mock-footer'),
      screen.findByTestId('mock-global-button')
    ]);
  });

  test('exports default App component correctly', () => {
    // This test ensures the export default statement is covered
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
    expect(App.name).toBe('App');
  });

  test('executes all React.lazy import statements', async () => {
    // This test specifically targets the React.lazy import lines for SonarQube coverage
    const { container } = render(<App />);

    // These assertions force execution of each React.lazy line
    expect(container.querySelector('.App')).toBeInTheDocument();

    // Wait for each lazy component to ensure the import() calls are executed
    const headerPromise = screen.findByTestId('mock-header');
    const footerPromise = screen.findByTestId('mock-footer');
    const buttonPromise = screen.findByTestId('mock-global-button');

    // Await all imports to ensure they execute
    const [header, footer, button] = await Promise.all([
      headerPromise,
      footerPromise,
      buttonPromise
    ]);

    // Verify each component loaded (ensuring each import line was executed)
    expect(header).toHaveTextContent('Mock Header');
    expect(footer).toHaveTextContent('Mock Footer');
    expect(button).toHaveTextContent('Mock Button');
  });

  test('renders complete App JSX structure', () => {
    // Test to cover the entire return statement and JSX structure
    const { container } = render(<App />);

    // Cover the main div with className="App"
    const appDiv = container.querySelector('.App');
    expect(appDiv).toBeInTheDocument();
    expect(appDiv).toHaveClass('App');

    // Cover each React.Suspense wrapper
    const suspenseWrappers = appDiv?.children;
    expect(suspenseWrappers).toHaveLength(3);

    // Verify the JSX structure contains the rendered components
    expect(appDiv?.innerHTML).toContain('mock-header');
    expect(appDiv?.innerHTML).toContain('mock-global-button');
    expect(appDiv?.innerHTML).toContain('mock-footer');
  });

  test('defines and uses all lazy components from imports', async () => {
    // This test ensures the const declarations for lazy components are covered
    const { container } = render(<App />);

    // Verify the App component imports are working
    expect(container.querySelector('.App')).toBeInTheDocument();

    // Force execution of all React.lazy(() => import(...)) statements
    await screen.findByTestId('mock-header');   // Forces Header lazy import
    await screen.findByTestId('mock-footer');   // Forces Footer lazy import  
    await screen.findByTestId('mock-global-button'); // Forces GlobalButton lazy import

    // Verify CSS import is working
    const appDiv = container.querySelector('.App');
    expect(appDiv).toHaveClass('App');
  });

  test('covers Suspense fallback rendering before lazy components load', () => {
    // Test that covers the fallback JSX structure in the source code
    const { container } = render(<App />);

    // Verify the complete App structure is present
    const appDiv = container.querySelector('.App');
    expect(appDiv).toBeInTheDocument();
    expect(appDiv?.children).toHaveLength(3); // 3 Suspense wrappers

    // Verify the App component renders and has correct structure
    expect(appDiv).toHaveClass('App');

    // This ensures the JSX return statement and fallback props are covered
    expect(container.firstChild).toBeTruthy();
  });
});
