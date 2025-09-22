// Header.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";

jest.mock("../components/SigninButton/SigninButton", () => ({
    SignInButton: () => <button data-testid="mock-signin">Sign in</button>,
}));

describe("Header Component", () => {
    beforeEach(() => {
        render(<Header />);
    });

    test("renders logo and brand text", () => {
        expect(screen.getByText("Remote Component")).toBeInTheDocument();
        expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // SVG logo
    });

    test("renders navigation menu items", () => {
        expect(screen.getByText("Products")).toBeInTheDocument();
        expect(screen.getByText("Pricing")).toBeInTheDocument();
        expect(screen.getByText("Resources")).toBeInTheDocument();
        expect(screen.getByText("Partners")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
    });

    test("dropdown menus appear when hovering/clicking Products", () => {
        const productsLink = screen.getByText("Products");
        fireEvent.click(productsLink);

        expect(screen.getByText("Web Components")).toBeInTheDocument();
        expect(screen.getByText("Mobile Apps")).toBeInTheDocument();
        expect(screen.getByText("Desktop Tools")).toBeInTheDocument();
    });

    test("dropdown menus appear when hovering/clicking Resources", () => {
        const resourcesLink = screen.getByText("Resources");
        fireEvent.click(resourcesLink);

        expect(screen.getByText("Documentation")).toBeInTheDocument();
        expect(screen.getByText("Tutorials")).toBeInTheDocument();
        expect(screen.getByText("Blog")).toBeInTheDocument();
        expect(screen.getByText("Support")).toBeInTheDocument();
    });

    test("renders action buttons", () => {
        expect(screen.getByText("Sign up")).toBeInTheDocument();
        expect(screen.getByTestId("mock-signin")).toBeInTheDocument();
    });

    test("renders mobile menu toggle button", () => {
        const toggleBtn = screen.getByRole("button", { name: "" });
        expect(toggleBtn).toBeInTheDocument();

        fireEvent.click(toggleBtn);
        // No menu logic in component, just make sure button is clickable
    });

    test("renders authors credit", () => {
        expect(screen.getByText("By Rahul Nikam & Saurav Nikam")).toBeInTheDocument();
    });
});
