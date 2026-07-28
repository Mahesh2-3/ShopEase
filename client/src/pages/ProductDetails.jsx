import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as productService from '../services/productService';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatCurrency } from '../utils/formatCurrency';

const Star = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill={filled ? '#F2A93B' : 'none'} stroke="#F2A93B" strokeWidth="1.5">
    <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6.1L10 14.9l-5.4 3 1.3-6.1L1.3 7.7l6.1-.6L10 1.5z" />
  </svg>
);

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [notFound, setNotFound] = useState(false);

  useDocumentTitle(product?.title || 'Product');

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    productService
      .getProductById(id)
      .then(setProduct)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showToast('Please log in to add items to your cart', 'info');
      navigate('/login');
      return;
    }
    addItem(product._id, quantity);
  };

  if (loading) return <LoadingSpinner label="Loading product" />;

  if (notFound || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-semibold mb-2">Product not found</h1>
        <p className="text-ink/60 mb-6">This product may have been removed.</p>
        <Link to="/products" className="text-brand-500 font-medium hover:underline">
          &larr; Back to products
        </Link>
      </div>
    );
  }

  const outOfStock = product.stock <= 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
      <Link to="/products" className="text-sm text-brand-500 hover:underline">
        &larr; Back to products
      </Link>

      <div className="grid sm:grid-cols-2 gap-10 mt-6">
        <div className="aspect-square rounded-xl overflow-hidden bg-brand-50 border border-brand-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        <div>
          <span className="text-xs font-medium text-brand-500 uppercase tracking-wide">{product.category}</span>
          <h1 className="font-display text-3xl font-semibold text-ink mt-1">{product.title}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} filled={n <= Math.round(product.rating)} />
            ))}
            <span className="text-sm text-ink/50 ml-1">({product.rating?.toFixed(1)} rating)</span>
          </div>

          <p className="font-display text-3xl font-semibold text-brand-700 mt-4">
            {formatCurrency(product.price)}
          </p>

          <p className="text-ink/70 mt-4 leading-relaxed">{product.description}</p>

          <p className={`mt-4 text-sm font-medium ${outOfStock ? 'text-red-600' : 'text-brand-600'}`}>
            {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
          </p>

          {!outOfStock && (
            <div className="flex items-center gap-3 mt-6">
              <div className="flex items-center border border-brand-100 rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 text-ink/60 hover:bg-brand-50 rounded-l-md"
                >
                  −
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-9 h-9 text-ink/60 hover:bg-brand-50 rounded-r-md"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-cream font-semibold transition-colors"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
