import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as orderService from '../services/orderService';
import LoadingSpinner from '../components/LoadingSpinner';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatCurrency } from '../utils/formatCurrency';

const OrderSuccess = () => {
  useDocumentTitle('Order Confirmed');
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService
      .getOrderById(id)
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading order" />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in-up">
      <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0F5257" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="font-display text-3xl font-semibold mb-2">Order Confirmed!</h1>
      <p className="text-ink/60 mb-8">
        Thank you for shopping with ShopEase. Your order has been placed successfully.
      </p>

      {order && (
        <div className="bg-white rounded-xl border border-brand-100 p-6 text-left mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-ink/60">Order ID</span>
            <span className="font-mono">{order._id}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-ink/60">Status</span>
            <span className="font-medium text-brand-600">{order.orderStatus}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold border-t border-brand-100 pt-3 mt-3">
            <span>Total</span>
            <span className="text-brand-700">{formatCurrency(order.totalPrice)}</span>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Link
          to="/products"
          className="px-6 py-2.5 rounded-md border border-brand-200 text-ink font-medium hover:bg-brand-50 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          to="/orders"
          className="px-6 py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-cream font-semibold transition-colors"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
