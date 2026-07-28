import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

const Star = ({ filled }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 20 20"
    fill={filled ? '#F2A93B' : 'none'}
    stroke="#F2A93B"
    strokeWidth="1.5"
  >
    <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6.1L10 14.9l-5.4 3 1.3-6.1L1.3 7.7l6.1-.6L10 1.5z" />
  </svg>
);

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('Please log in to add items to your cart', 'info');
      navigate('/login');
      return;
    }
    addItem(product._id, 1);
  };

  const outOfStock = product.stock <= 0;

  return (
    <Link
      to={`/products/${product._id}`}
      className="group bg-white rounded-xl border border-brand-100 overflow-hidden hover:shadow-soft transition-shadow flex flex-col"
    >
      <div className="aspect-square bg-brand-50 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
          }}
        />
        {outOfStock && (
          <span className="absolute top-2 left-2 bg-ink/80 text-cream text-xs font-semibold px-2 py-1 rounded">
            Out of stock
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-medium text-brand-500 uppercase tracking-wide">{product.category}</span>
        <h3 className="font-display font-semibold text-ink mt-1 line-clamp-1">{product.title}</h3>
        <div className="flex items-center gap-0.5 mt-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} filled={n <= Math.round(product.rating)} />
          ))}
          <span className="text-xs text-ink/50 ml-1">({product.rating?.toFixed(1)})</span>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-brand-700">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="text-sm font-semibold px-3 py-1.5 rounded-md bg-accent text-ink hover:bg-accent-dark disabled:bg-ink/10 disabled:text-ink/40 disabled:cursor-not-allowed transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
