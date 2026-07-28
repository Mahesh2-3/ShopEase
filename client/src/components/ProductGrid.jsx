import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, emptyMessage = 'No products found.' }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-brand-200 rounded-xl">
        <p className="text-ink/60">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
