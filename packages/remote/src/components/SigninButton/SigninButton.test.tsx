// SignInButton.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SignInButton } from './SigninButton';
import * as styles from './SigninButton.module.css';

describe('SignInButton', () => {
    test('renders a button with correct text', () => {
        render(<SignInButton />);
        const button = screen.getByRole('button', { name: /sign in/i });
        expect(button).toBeInTheDocument();
    });

    test('applies the correct CSS class', () => {
        render(<SignInButton />);
        const button = screen.getByRole('button', { name: /sign in/i });
        // The class from CSS module should be applied
        expect(button).toHaveClass(styles.button);
    });
});
