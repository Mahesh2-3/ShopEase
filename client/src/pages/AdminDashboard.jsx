import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as productService from '../services/productService';
import * as orderService from '../services/orderService';
import LoadingSpinner from '../components/LoadingSpinner';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatCurrency } from '../utils/formatCurrency';

const StatCard = ({ label, value, accentClass = 'text-brand-700' }) => (
  <div className="bg-white rounded-xl border border-brand-100 p-6">
    <p className="text-sm text-ink/50">{label}</p>
    <p className={`font-display text-3xl font-semibold mt-1 ${accentClass}`}>{value}</p>
  </div>
);

const AdminDashboard = () => {
  useDocumentTitle('Admin Dashboard');
  const [stats, setStats] = useState({ productCount: 0, orderCount: 0, revenue: 0, lowStock: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([productService.getProducts({ limit: 1000 }), orderService.getOrders()])
      .then(([productData, orders]) => {
        const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
        const lowStock = productData.products.filter((p) => p.stock <= 5).length;
        setStats({
          productCount: productData.total,
          orderCount: orders.length,
          revenue,
          lowStock,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Loading dashboard" />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Products" value={stats.productCount} />
        <StatCard label="Total Orders" value={stats.orderCount} />
        <StatCard label="Total Revenue" value={formatCurrency(stats.revenue)} />
        <StatCard label="Low Stock Items" value={stats.lowStock} accentClass="text-accent-dark" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link
          to="/admin/products"
          className="bg-brand-500 hover:bg-brand-600 transition-colors rounded-xl p-8 text-cream flex flex-col justify-between"
        >
          <h2 className="font-display text-xl font-semibold mb-2">Manage Products</h2>
          <p className="text-cream/80 text-sm">Add, edit, or remove products and update stock levels.</p>
        </Link>
        <Link
          to="/orders"
          className="bg-ink hover:bg-ink/90 transition-colors rounded-xl p-8 text-cream flex flex-col justify-between"
        >
          <h2 className="font-display text-xl font-semibold mb-2">View All Orders</h2>
          <p className="text-cream/70 text-sm">Review customer orders and update their status.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
