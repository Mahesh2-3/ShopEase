import React, { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  image: '',
  rating: '',
};

const ProductFormModal = ({ product, onClose, onSubmit }) => {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || '',
        description: product.description || '',
        price: product.price ?? '',
        category: product.category || '',
        stock: product.stock ?? '',
        image: product.image || '',
        rating: product.rating ?? '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [product]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        rating: form.rating === '' ? undefined : Number(form.rating),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/40 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">{product ? 'Edit Product' : 'Add Product'}</h2>
          <button onClick={onClose} className="text-ink/40 hover:text-ink" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">Title</label>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">Description</label>
            <textarea
              name="description"
              required
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                required
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">Stock</label>
              <input
                type="number"
                min="0"
                name="stock"
                required
                value={form.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">Category</label>
              <input
                name="category"
                required
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1">Image URL</label>
            <input
              name="image"
              placeholder="https://..."
              value={form.image}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-brand-100 focus:border-brand-400 outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-md border border-brand-100 text-ink/70 font-medium hover:bg-brand-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-cream font-semibold disabled:opacity-60"
            >
              {saving ? 'Saving...' : product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
