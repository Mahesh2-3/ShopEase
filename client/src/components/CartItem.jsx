import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;
  if (!product) return null;

  return (
    <div className="flex gap-4 py-4 border-b border-brand-100 last:border-b-0">
      <Link to={`/products/${product._id}`} className="w-20 h-20 rounded-lg overflow-hidden bg-brand-50 shrink-0">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/products/${product._id}`} className="font-medium text-ink hover:text-brand-500 line-clamp-1">
          {product.title}
        </Link>
        <p className="text-sm text-ink/50">{product.category}</p>
        <p className="font-display font-semibold text-brand-700 mt-1">{formatCurrency(product.price)}</p>
      </div>

      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          onClick={() => onRemove(product._id)}
          className="text-xs text-ink/40 hover:text-red-600 transition-colors"
        >
          Remove
        </button>
        <div className="flex items-center gap-2 border border-brand-100 rounded-md">
          <button
            onClick={() => onUpdateQuantity(product._id, Math.max(1, quantity - 1))}
            className="w-7 h-7 flex items-center justify-center text-ink/60 hover:bg-brand-50 rounded-l-md"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(product._id, Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
            className="w-7 h-7 flex items-center justify-center text-ink/60 hover:bg-brand-50 rounded-r-md disabled:opacity-30"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
