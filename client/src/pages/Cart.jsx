import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatCurrency } from '../utils/formatCurrency';

const CartPage = () => {
  useDocumentTitle('Your Cart');
  const { cart, loading, updateItem, removeItem, clear } = useCart();
  const navigate = useNavigate();

  const products = cart.products || [];
  const isEmpty = !loading && products.length === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-semibold mb-6">Your Cart</h1>

      {isEmpty ? (
        <div className="text-center py-20 border border-dashed border-brand-200 rounded-xl">
          <p className="text-ink/60 mb-4">Your cart is empty.</p>
          <Link
            to="/products"
            className="inline-block px-6 py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-cream font-semibold transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="sm:col-span-2 bg-white rounded-xl border border-brand-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-ink">{products.length} item(s)</h2>
              <button onClick={clear} className="text-sm text-ink/50 hover:text-red-600 transition-colors">
                Clear cart
              </button>
            </div>
            {products.map((item) => (
              <CartItem
                key={item.product?._id}
                item={item}
                onUpdateQuantity={updateItem}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="bg-white rounded-xl border border-brand-100 p-6 h-fit">
            <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm text-ink/70 mb-2">
              <span>Subtotal</span>
              <span>{formatCurrency(cart.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm text-ink/70 mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t border-brand-100 pt-4 mb-6">
              <span>Total</span>
              <span className="text-brand-700">{formatCurrency(cart.totalAmount)}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-2.5 rounded-md bg-accent hover:bg-accent-dark text-ink font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
