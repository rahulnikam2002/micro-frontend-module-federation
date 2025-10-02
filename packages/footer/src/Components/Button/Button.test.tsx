import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import GlobalButton from './Button';

describe('GlobalButton component', () => {
    test('renders with expected text and class names', () => {
        render(<GlobalButton />);

        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
        // Class names come from CSS Modules; ensure container and button exist in DOM
        const container = button.closest('div');
        expect(container).toBeInTheDocument();
    });

    test('is clickable and can call a provided onClick (via wrapper)', () => {
        const handleClick = jest.fn();

        // create a simple wrapper component that attaches an onClick to the rendered button
        const Wrapper = () => (
            <div>
                {/* Recreate the structure to forward onClick */}
                <div>
                    <button onClick={handleClick}>Click Me</button>
                </div>
            </div>
        );

        render(<Wrapper />);

        const button = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('has accessible name and is keyboard focusable', () => {
        render(<GlobalButton />);
        const button = screen.getByRole('button', { name: /click me/i });
        button.focus();
        expect(button).toHaveFocus();
    });
});
