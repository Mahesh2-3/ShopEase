import React, { useState } from 'react';

const initialState = {
  fullName: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  phone: '',
};

const CheckoutForm = ({ onSubmit, submitting }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = 'This field is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  const fields = [
    { name: 'fullName', label: 'Full Name', span: 2 },
    { name: 'street', label: 'Street Address', span: 2 },
    { name: 'city', label: 'City', span: 1 },
    { name: 'state', label: 'State / Province', span: 1 },
    { name: 'zipCode', label: 'ZIP / Postal Code', span: 1 },
    { name: 'country', label: 'Country', span: 1 },
    { name: 'phone', label: 'Phone Number', span: 2 },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-brand-100 p-6">
      <h2 className="font-display text-xl font-semibold mb-4">Shipping Information</h2>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className={field.span === 2 ? 'col-span-2' : 'col-span-2 sm:col-span-1'}>
            <label htmlFor={field.name} className="block text-sm font-medium text-ink/70 mb-1">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border outline-none focus:ring-1 focus:ring-brand-400 ${
                errors[field.name] ? 'border-red-400' : 'border-brand-100 focus:border-brand-400'
              }`}
            />
            {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full py-3 rounded-md bg-brand-500 hover:bg-brand-600 text-cream font-semibold transition-colors disabled:opacity-60"
      >
        {submitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
};

export default CheckoutForm;
