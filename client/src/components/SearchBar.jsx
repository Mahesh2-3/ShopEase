import React, { useState } from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search products...' }) => {
  const [local, setLocal] = useState(value || '');

  const handleChange = (e) => {
    setLocal(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="relative flex-1">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={local}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-100 bg-white focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none text-sm"
        aria-label="Search products"
      />
    </div>
  );
};

export default SearchBar;
