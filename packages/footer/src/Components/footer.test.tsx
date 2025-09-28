// Footer.test.tsx (or .jsx depending on your setup)
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./footer";

describe("Footer Component", () => {
    beforeEach(() => {
        render(<Footer />);
    });

    // ---------- Brand Section ----------
    test("renders logo and brand text", () => {
        expect(screen.getByText("Micro Frontend by Rahul Nikam")).toBeInTheDocument();
        expect(screen.getByText("🔷")).toBeInTheDocument();
    });

    test("renders brand description", () => {
        expect(
            screen.getByText(
                "Hassle-free blogging platform that developers and teams love."
            )
        ).toBeInTheDocument();
    });

    test("renders all social links", () => {
        const socialIcons = ["✕", "📘", "💼", "📸", "▶️"];
        socialIcons.forEach((icon) => {
            expect(screen.getByText(icon)).toBeInTheDocument();
        });
    });

    test("shows operational status indicator and text", () => {
        expect(screen.getByText("All systems operational")).toBeInTheDocument();
        expect(
            document.querySelector(".status-indicator")
        ).toBeInTheDocument();
    });

    // ---------- Product Column ----------
    test("renders Product column with links", () => {
        expect(screen.getByText("Product")).toBeInTheDocument();
        expect(screen.getByText("Headless CMS")).toBeInTheDocument();
        expect(screen.getByText("New")).toBeInTheDocument(); // new badge
        expect(screen.getByText("Pricing")).toBeInTheDocument();
        expect(screen.getByText("GraphQL APIs")).toBeInTheDocument();
        expect(screen.getByText("Open source Starter-kit")).toBeInTheDocument();
    });

    test("renders Explore subsection", () => {
        expect(screen.getByText("Explore")).toBeInTheDocument();
        ["My feed", "Case studies", "Hashnode AI", "Referral Program"].forEach(
            (link) => {
                expect(screen.getByText(link)).toBeInTheDocument();
            }
        );
    });

    // ---------- Company Column ----------
    test("renders Company column with links", () => {
        expect(screen.getByText("Company")).toBeInTheDocument();
        [
            "About Codearchiticture",
            "Careers",
            "Logos and media",
            "Changelog",
            "Feature Requests",
        ].forEach((link) => {
            expect(screen.getByText(link)).toBeInTheDocument();
        });
    });

    test("renders Blogs subsection", () => {
        expect(screen.getByText("Blogs")).toBeInTheDocument();
        ["Official Blog", "Engineering Blog", "Hashnode Townhall"].forEach(
            (link) => {
                expect(screen.getByText(link)).toBeInTheDocument();
            }
        );
    });

    // ---------- Partner with us Column ----------
    test("renders Partner with us column", () => {
        expect(screen.getByText("Partner with us")).toBeInTheDocument();
        expect(screen.getByText("Host a Hackathon")).toBeInTheDocument();
    });

    test("renders Support subsection", () => {
        expect(screen.getByText("Support")).toBeInTheDocument();
        ["Support docs", "Contact", "Join discord"].forEach((link) => {
            expect(screen.getByText(link)).toBeInTheDocument();
        });
    });

    test("renders Comparisons subsection", () => {
        expect(screen.getByText("Comparisons")).toBeInTheDocument();
    });

    // ---------- Footer Bottom ----------
    test("renders footer bottom section", () => {
        expect(
            screen.getByText("© 2024 Hashnode — Linktree Inc.")
        ).toBeInTheDocument();
    });

    test("renders footer bottom links", () => {
        ["Privacy Policy", "Terms", "Code of conduct"].forEach((link) => {
            expect(screen.getByText(link)).toBeInTheDocument();
        });
    });
});
