// App.test.tsx (or App.test.js)
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

// Mock Footer component to isolate App tests
jest.mock("../src/Components/footer", () => () => <div data-testid="footer">Mock Footer</div>);

describe("App Component", () => {
    test("renders without crashing", () => {
        render(<App />);
    });

    test("renders the Footer component", () => {
        render(<App />);
        const footerElement = screen.getByTestId("footer");
        expect(footerElement).toBeInTheDocument();
    });

    test("Footer contains expected content", () => {
        render(<App />);
        expect(screen.getByText(/mock footer/i)).toBeInTheDocument();
    });

    test("App has root div with className App", () => {
        const { container } = render(<App />);
        const rootDiv = container.querySelector("div.App");
        expect(rootDiv).toBeInTheDocument();
    });
});
