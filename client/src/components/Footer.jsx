import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-700 text-cream/90 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-ink font-display text-sm">
              S
            </span>
            <span className="font-display text-lg font-semibold text-cream">ShopEase</span>
          </div>
          <p className="text-sm text-cream/70">
            A simple, modern shopping experience built to demonstrate the MERN stack.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-cream mb-3 text-sm tracking-wide uppercase">Shop</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>
              <Link to="/products" className="hover:text-accent-light transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-accent-light transition-colors">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-accent-light transition-colors">
                Order History
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-cream mb-3 text-sm tracking-wide uppercase">Account</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>
              <Link to="/login" className="hover:text-accent-light transition-colors">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-accent-light transition-colors">
                Create Account
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-accent-light transition-colors">
                My Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        Built with the MERN stack &middot; ShopEase demo project
      </div>
    </footer>
  );
};

export default Footer;
