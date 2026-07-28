import React from 'react';

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-2 rounded-md text-sm font-medium text-ink/70 hover:bg-brand-50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      {pageNumbers.map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          aria-current={n === page ? 'page' : undefined}
          className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
            n === page ? 'bg-brand-500 text-cream' : 'text-ink/70 hover:bg-brand-50'
          }`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className="px-3 py-2 rounded-md text-sm font-medium text-ink/70 hover:bg-brand-50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
