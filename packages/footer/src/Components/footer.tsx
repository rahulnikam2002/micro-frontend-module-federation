import React from 'react';
import './footer.css';
import ButtonExamples from './Button/ButtonExamples';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <>
                    <ButtonExamples />
                </>
                <div className="footer-brand">
                    <div className="logo">
                        <span className="logo-icon">🔷</span>
                        <span className="logo-text">Micro Frontend by Rahul Nikam</span>
                    </div>
                    <p className="brand-description">
                        Hassle-free blogging platform that developers and teams love.
                    </p>

                    {/* Social Links */}
                    <div className="social-links">
                        <a href="#" className="social-link">✕</a>
                        <a href="#" className="social-link">📘</a>
                        <a href="#" className="social-link">💼</a>
                        <a href="#" className="social-link">📸</a>
                        <a href="#" className="social-link">▶️</a>
                    </div>

                    <div className="operational-status">
                        <span className="status-indicator"></span>
                        <span className="status-text">All systems operational</span>
                    </div>
                </div>

                {/* Product Column */}
                <div className="footer-column">
                    <h3 className="column-title">Product</h3>
                    <ul className="column-links">
                        <li>
                            <a href="#">Headless CMS</a>
                            <span className="new-badge">New</span>
                        </li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">GraphQL APIs</a></li>
                        <li><a href="#">Open source Starter-kit</a></li>
                    </ul>

                    <h4 className="subsection-title">Explore</h4>
                    <ul className="column-links">
                        <li><a href="#">My feed</a></li>
                        <li><a href="#">Case studies</a></li>
                        <li><a href="#">Hashnode AI</a></li>
                        <li><a href="#">Referral Program</a></li>
                    </ul>
                </div>

                {/* Company Column */}
                <div className="footer-column">
                    <h3 className="column-title">Company</h3>
                    <ul className="column-links">
                        <li><a href="#">About Codearchiticture</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Logos and media</a></li>
                        <li><a href="#">Changelog</a></li>
                        <li><a href="#">Feature Requests</a></li>
                    </ul>

                    <h4 className="subsection-title">Blogs</h4>
                    <ul className="column-links">
                        <li><a href="#">Official Blog</a></li>
                        <li><a href="#">Engineering Blog</a></li>
                        <li><a href="#">Hashnode Townhall</a></li>
                    </ul>
                </div>

                {/* Partner with us Column */}
                <div className="footer-column">
                    <h3 className="column-title">Partner with us</h3>
                    <ul className="column-links">
                        <li><a href="#">Host a Hackathon</a></li>
                    </ul>

                    <h4 className="subsection-title">Support</h4>
                    <ul className="column-links">
                        <li><a href="#">Support docs</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Join discord</a></li>
                    </ul>

                    <h4 className="subsection-title">Comparisons</h4>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p className="copyright">© 2024 Hashnode — Linktree Inc.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms</a>
                        <a href="#">Code of conduct</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;