import api from './api';

export const createOrder = (data) => api.post('/orders', data).then((res) => res.data);
export const getOrders = () => api.get('/orders').then((res) => res.data);
export const getOrderById = (id) => api.get(`/orders/${id}`).then((res) => res.data);
export const updateOrderStatus = (id, orderStatus) =>
  api.put(`/orders/${id}/status`, { orderStatus }).then((res) => res.data);
