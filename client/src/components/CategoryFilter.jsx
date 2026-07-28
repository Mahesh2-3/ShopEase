import React from 'react';

const CategoryFilter = ({ categories = [], selected, onSelect }) => {
  const all = ['All', ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selected === category
              ? 'bg-brand-500 text-cream border-brand-500'
              : 'bg-white text-ink/70 border-brand-100 hover:border-brand-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
