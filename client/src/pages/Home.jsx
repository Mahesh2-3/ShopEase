import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as productService from '../services/productService';
import ProductGrid from '../components/ProductGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle('Home');
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService
      .getProducts({ limit: 8, sort: 'newest' })
      .then((data) => setFeatured(data.products))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-500">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-accent" />
          <div className="absolute -left-16 bottom-0 w-72 h-72 rounded-full bg-brand-300" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid sm:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in-up">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/90 text-ink text-xs font-semibold uppercase tracking-wide mb-4">
              Everyday essentials, easily found
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-cream leading-tight">
              Shopping made <span className="text-accent-light">simple</span>.
            </h1>
            <p className="mt-4 text-cream/80 text-lg max-w-md">
              Browse a curated catalog, fill your cart, and check out in minutes — no clutter, no
              distractions.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                to="/products"
                className="px-6 py-3 rounded-md bg-accent text-ink font-semibold hover:bg-accent-dark transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-md border border-cream/30 text-cream font-semibold hover:bg-cream/10 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-40 h-40 rounded-2xl bg-cream/95 shadow-soft flex items-center justify-center font-display text-brand-500 text-sm mt-8">
                Fast Checkout
              </div>
              <div className="w-40 h-40 rounded-2xl bg-accent shadow-soft flex items-center justify-center font-display text-ink text-sm">
                Fresh Picks
              </div>
              <div className="w-40 h-40 rounded-2xl bg-brand-300 shadow-soft flex items-center justify-center font-display text-brand-800 text-sm">
                Easy Returns
              </div>
              <div className="w-40 h-40 rounded-2xl bg-cream/95 shadow-soft flex items-center justify-center font-display text-brand-500 text-sm mt-8">
                Secure Login
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Newly Added</h2>
            <p className="text-ink/60 mt-1">Fresh items straight from the catalog.</p>
          </div>
          <Link to="/products" className="text-brand-500 font-medium hover:underline hidden sm:block">
            View all &rarr;
          </Link>
        </div>

        {loading ? <LoadingSpinner label="Loading products" /> : <ProductGrid products={featured} />}
      </section>

      {/* Categories strip */}
      <section className="bg-brand-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink mb-3">Why shop with ShopEase?</h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-8 text-left">
            <div className="bg-white p-6 rounded-xl border border-brand-100">
              <h3 className="font-display font-semibold text-brand-700 mb-2">Curated Catalog</h3>
              <p className="text-sm text-ink/60">Search, filter, and sort to find exactly what you need.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-brand-100">
              <h3 className="font-display font-semibold text-brand-700 mb-2">Simple Checkout</h3>
              <p className="text-sm text-ink/60">Review your cart and place your order in a few clicks.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-brand-100">
              <h3 className="font-display font-semibold text-brand-700 mb-2">Order History</h3>
              <p className="text-sm text-ink/60">Track every order you've placed from your profile.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
