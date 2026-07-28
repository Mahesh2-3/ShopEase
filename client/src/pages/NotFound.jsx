import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const NotFound = () => {
  useDocumentTitle('Page Not Found');
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <p className="font-display text-7xl font-semibold text-brand-200 mb-4">404</p>
      <h1 className="font-display text-2xl font-semibold mb-2">Page not found</h1>
      <p className="text-ink/60 mb-8">The page you're looking for doesn't exist or has moved.</p>
      <Link
        to="/"
        className="inline-block px-6 py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-cream font-semibold transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
