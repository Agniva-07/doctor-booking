import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-name">Dr. Suman Pandab</span>
          <span className="brand-subtitle">Homoeopathic Physician</span>
        </Link>

        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <NavLink to="/" onClick={closeMenu} className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu} className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
            </li>
            <li>
              <NavLink to="/consultation" onClick={closeMenu} className={({isActive}) => isActive ? 'active' : ''}>Consultation</NavLink>
            </li>
            <li>
              <NavLink to="/appointment" onClick={closeMenu} className={({isActive}) => isActive ? 'active' : ''}>Appointment</NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu} className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
            </li>
          </ul>
          
          <div className="nav-actions">
            <a href="tel:8900012992" className="nav-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              8900012992
            </a>
            <Button to="/appointment" size="sm" onClick={closeMenu}>
              Book Appointment
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
