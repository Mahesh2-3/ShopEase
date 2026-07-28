import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium transition-colors rounded-md ${
    isActive ? 'text-brand-500 bg-brand-50' : 'text-ink/70 hover:text-brand-500 hover:bg-brand-50'
  }`;

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-brand-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-cream font-display text-lg">
              S
            </span>
            <span className="font-display text-xl font-semibold text-brand-700">ShopEase</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/orders" className={navLinkClass}>
                My Orders
              </NavLink>
            )}
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/cart"
              className="relative px-3 py-2 text-ink/70 hover:text-brand-500 rounded-md transition-colors"
              aria-label="View cart"
            >
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-ink text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="px-3 py-2 text-sm font-medium text-ink/70 hover:text-brand-500 rounded-md"
                >
                  Hi, {user?.name?.split(' ')[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-cream bg-brand-500 hover:bg-brand-600 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-ink/70 hover:text-brand-500 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-cream bg-brand-500 hover:bg-brand-600 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-ink/70 hover:bg-brand-50"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 animate-fade-in-up">
            <NavLink to="/" className={navLinkClass} end onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Products
            </NavLink>
            <NavLink to="/cart" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Cart {itemCount > 0 && `(${itemCount})`}
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/orders" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  My Orders
                </NavLink>
                <NavLink to="/profile" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Profile
                </NavLink>
              </>
            )}
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Admin
              </NavLink>
            )}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-left px-3 py-2 text-sm font-medium text-red-600">
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
