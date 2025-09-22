import React from "react";
import { SignInButton } from "./SigninButton/SigninButton";
import "./Header.css";

export const Header = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-brand">
          <div className="logo">
            <svg role="img" data-testid="logo-svg" width="32" height="32" viewBox="0 0 32 32" className="logo-icon">
              <circle cx="16" cy="16" r="16" fill="url(#gradient)" />
              <path d="M12 10h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h6v2h-6v-2z" fill="white" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b35" />
                  <stop offset="100%" stopColor="#f7931e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="brand-text">Remote Component</span>
        </div>

        {/* Navigation Menu */}
        <nav className="navbar-nav">
          <div className="nav-item dropdown">
            <a href="#" className="nav-link">
              Products
              <svg data-testid="logo-svg" className="dropdown-icon" width="16" height="16" viewBox="0 0 16 16">
                <path d="M4.5 6L8 9.5L11.5 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">Web Components</a>
              <a href="#" className="dropdown-item">Mobile Apps</a>
              <a href="#" className="dropdown-item">Desktop Tools</a>
            </div>
          </div>

          <div className="nav-item">
            <a href="#" className="nav-link">Pricing</a>
          </div>

          <div className="nav-item dropdown">
            <a href="#" className="nav-link">
              Resources
              <svg data-testid="logo-svg" className="dropdown-icon" width="16" height="16" viewBox="0 0 16 16">
                <path d="M4.5 6L8 9.5L11.5 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">Documentation</a>
              <a href="#" className="dropdown-item">Tutorials</a>
              <a href="#" className="dropdown-item">Blog</a>
              <a href="#" className="dropdown-item">Support</a>
            </div>
          </div>

          <div className="nav-item">
            <a href="#" className="nav-link">Partners</a>
          </div>

          <div className="nav-item">
            <a href="#" className="nav-link">About</a>
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="navbar-actions">
          <button className="btn-signup">Sign up</button>
          <div className="signin-wrapper">
            <SignInButton />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Authors Credit */}
      <div className="authors-credit">
        <span>By Rahul Nikam & Saurav Nikam</span>
      </div>
    </header>
  );
};

export default Header;
