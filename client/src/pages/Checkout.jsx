import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useToast } from '../context/ToastContext';
import * as orderService from '../services/orderService';
import CheckoutForm from '../components/CheckoutForm';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { formatCurrency } from '../utils/formatCurrency';

const Checkout = () => {
  useDocumentTitle('Checkout');
  const { cart, refreshCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const products = cart.products || [];

  useEffect(() => {
    if (!submitting && products.length === 0) {
      navigate('/cart');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (shippingAddress) => {
    setSubmitting(true);
    try {
      const orderItems = products.map((item) => ({
        product: item.product._id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      }));

      const order = await orderService.createOrder({ shippingAddress, products: orderItems });
      await refreshCart();
      showToast('Order placed successfully!', 'success');
      navigate(`/order-success/${order._id}`);
    } catch (error) {
      showToast(error.response?.data?.message || 'Could not place order', 'error');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-semibold mb-6">Checkout</h1>

      <div className="grid sm:grid-cols-3 gap-8">
        <div className="sm:col-span-2">
          <CheckoutForm onSubmit={handleSubmit} submitting={submitting} />
        </div>

        <div className="bg-white rounded-xl border border-brand-100 p-6 h-fit">
          <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {products.map((item) => (
              <li key={item.product?._id} className="flex justify-between text-sm">
                <span className="text-ink/70">
                  {item.product?.title} &times; {item.quantity}
                </span>
                <span className="font-medium">{formatCurrency(item.product?.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold text-lg border-t border-brand-100 pt-4">
            <span>Total</span>
            <span className="text-brand-700">{formatCurrency(cart.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
