import React, { useEffect, useState } from 'react';
import * as productService from '../services/productService';
import ProductFormModal from '../components/ProductFormModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../context/ToastContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatCurrency } from '../utils/formatCurrency';

const ManageProducts = () => {
  useDocumentTitle('Manage Products');
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = () => {
    setLoading(true);
    productService
      .getProducts({ limit: 100, sort: 'newest' })
      .then((data) => setProducts(data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, formData);
        showToast('Product updated', 'success');
      } else {
        await productService.createProduct(formData);
        showToast('Product added', 'success');
      }
      setModalOpen(false);
      loadProducts();
    } catch (error) {
      showToast(error.response?.data?.message || 'Could not save product', 'error');
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
    try {
      await productService.deleteProduct(product._id);
      showToast('Product deleted', 'success');
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (error) {
      showToast(error.response?.data?.message || 'Could not delete product', 'error');
    }
  };

  const handleSeed = async () => {
    if (!window.confirm('Fetch and seed products from external API? This will populate the store with real products and images.')) return;
    try {
      setLoading(true);
      const res = await productService.seedProducts();
      showToast(res.message || 'Products seeded successfully!', 'success');
      loadProducts();
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to seed products', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-3xl font-semibold">Manage Products</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            className="px-4 py-2.5 rounded-md border border-brand-300 hover:bg-brand-50 text-brand-700 font-medium transition-colors text-sm"
          >
            ⚡ Seed Sample Products (API)
          </button>
          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded-md bg-brand-500 hover:bg-brand-600 text-cream font-semibold transition-colors text-sm"
          >
            + Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading products" />
      ) : (
        <div className="bg-white rounded-xl border border-brand-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink/50 border-b border-brand-100">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-brand-50 last:border-b-0 hover:bg-brand-50/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.title} className="w-10 h-10 rounded-md object-cover" />
                      <span className="font-medium text-ink line-clamp-1">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{product.category}</td>
                  <td className="px-4 py-3 font-medium text-brand-700">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-3">
                    <span className={product.stock <= 5 ? 'text-accent-dark font-semibold' : 'text-ink/70'}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEditModal(product)}
                      className="text-brand-500 hover:underline mr-4 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="text-red-500 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p className="text-center text-ink/50 py-10">No products yet.</p>}
        </div>
      )}

      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ManageProducts;
