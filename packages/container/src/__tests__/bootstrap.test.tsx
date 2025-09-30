import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';

// Mock App so we can track if it's rendered
jest.mock('../App', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-app">Mock App</div>,
}));

describe('bootstrap', () => {
    let createRootSpy: jest.SpyInstance;

    beforeEach(() => {
        // Mock createRoot
        createRootSpy = jest.spyOn(ReactDOM, 'createRoot').mockReturnValue({
            render: jest.fn(),
        } as any); // cast to satisfy TS
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders App using ReactDOM.createRoot', () => {
        // Require the bootstrap file after mocking
        require('../bootstrap');

        // Check that createRoot was called with the correct element
        const rootElement = document.getElementById('root');
        expect(createRootSpy).toHaveBeenCalledWith(rootElement);

        // Check that render was called
        const renderSpy = createRootSpy.mock.results[0].value.render;
        expect(renderSpy).toHaveBeenCalled();
    });
});
