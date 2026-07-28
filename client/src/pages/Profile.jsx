import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Profile = () => {
  useDocumentTitle('My Profile');
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: user?.name || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
  });
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country,
        },
      };
      if (password) payload.password = password;

      await updateProfile(payload);
      setPassword('');
      showToast('Profile updated', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Could not update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-semibold mb-6">My Profile</h1>

      <div className="bg-white rounded-xl border border-brand-100 p-6 mb-6">
        <p className="text-sm text-ink/50">Signed in as</p>
        <p className="font-medium text-ink">{user?.email}</p>
        <span className="inline-block mt-2 text-xs font-semibold uppercase tracking-wide text-brand-500 bg-brand-50 px-2 py-1 rounded">
          {user?.role}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-brand-100 p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold">Profile Details</h2>

        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
          />
        </div>

        <h3 className="font-medium text-ink/80 pt-2">Shipping Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-ink/70 mb-1">Street</label>
            <input
              name="street"
              value={form.street}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">State</label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">ZIP Code</label>
            <input
              name="zipCode"
              value={form.zipCode}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">Country</label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
            />
          </div>
        </div>

        <h3 className="font-medium text-ink/80 pt-2">Change Password</h3>
        <div>
          <label className="block text-sm font-medium text-ink/70 mb-1">New Password (optional)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
            className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-cream font-semibold transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
