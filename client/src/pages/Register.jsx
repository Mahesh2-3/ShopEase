import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Register = () => {
  useDocumentTitle('Create Account');
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      showToast('Account created successfully!', 'success');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-xl border border-brand-100 p-8 animate-fade-in-up">
        <h1 className="font-display text-2xl font-semibold text-center mb-1">Create an account</h1>
        <p className="text-center text-ink/60 text-sm mb-6">Join ShopEase in a few seconds.</p>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink/70 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink/70 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink/70 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-ink/70 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-cream font-semibold transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-ink/60 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-500 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
