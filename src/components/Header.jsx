import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-glass-cheers"></i>
            <span>Celebration Connect</span>
          </div>
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <nav className={mobileMenuOpen ? 'active' : ''}>
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/events">Explore</Link></li>
              {isAuthenticated && <li><Link to="/events">My Events</Link></li>}
              <li><a href="#how-it-works">How It Works</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            {isAuthenticated ? (
              <>
                <button className="btn btn-primary" onClick={() => navigate('/events')}>
                  <i className="fas fa-plus"></i> Add Celebration
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-white">Welcome, {user?.name}</span>
                  <button className="btn btn-secondary" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button className="btn btn-secondary" onClick={() => navigate('/login')}>
                  <i className="fas fa-user"></i> Log In
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/register')}>
                  <i className="fas fa-user-plus"></i> Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
