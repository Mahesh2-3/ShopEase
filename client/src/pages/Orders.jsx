import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as orderService from '../services/orderService';
import LoadingSpinner from '../components/LoadingSpinner';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatCurrency } from '../utils/formatCurrency';
import { useAuth } from '../hooks/useAuth';

const statusColor = {
  Pending: 'bg-amber-50 text-amber-700',
  Processing: 'bg-blue-50 text-blue-700',
  Shipped: 'bg-indigo-50 text-indigo-700',
  Delivered: 'bg-brand-50 text-brand-700',
  Cancelled: 'bg-red-50 text-red-700',
};

const Orders = () => {
  useDocumentTitle('My Orders');
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService
      .getOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Loading orders" />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-semibold mb-6">{isAdmin ? 'All Orders' : 'My Orders'}</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-brand-200 rounded-xl">
          <p className="text-ink/60 mb-4">You haven't placed any orders yet.</p>
          <Link
            to="/products"
            className="inline-block px-6 py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-cream font-semibold transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl border border-brand-100 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <p className="text-xs text-ink/50">Order ID</p>
                  <p className="font-mono text-sm">{order._id}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[order.orderStatus] || 'bg-gray-50 text-gray-700'}`}>
                  {order.orderStatus}
                </span>
              </div>
              <div className="flex flex-wrap justify-between items-center text-sm text-ink/60">
                <span>{order.products?.length} item(s)</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                <span className="font-display font-semibold text-brand-700 text-base">
                  {formatCurrency(order.totalPrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
