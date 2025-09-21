import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';
import HeaderDefault from '../components/Header';

describe('Header component (remote)', () => {
    test('renders without crashing and shows the expected text', () => {
        render(<Header />);
        expect(screen.getByText(/Welcome to the Remote Component/i)).toBeInTheDocument();
    });

    test('has an h1 heading with correct role and content', () => {
        render(<Header />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent(/Welcome to the Remote Component by Rahul Nikam and Saurav Nikam/);
    });

    test('default export works as a component', () => {
        render(<HeaderDefault />);
        expect(screen.getByText(/Welcome to the Remote Component/i)).toBeInTheDocument();
    });

    // Removed snapshot test to avoid creating __snapshots__ files
});
