const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create a new order from the current cart (or a provided item list)
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, products } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    // Prefer explicit products from the request body (checkout page sends the
    // reviewed cart contents); fall back to the user's saved cart.
    let orderItems = products;

    if (!orderItems || orderItems.length === 0) {
      const cart = await Cart.findOne({ userId: req.user._id }).populate('products.product');
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ message: 'Your cart is empty' });
      }
      orderItems = cart.products.map((item) => ({
        product: item.product._id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      }));
    }

    // Verify stock and compute total server-side (never trust the client total)
    let totalPrice = 0;
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.title || item.product}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
      }
      totalPrice += product.price * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      userId: req.user._id,
      products: orderItems,
      totalPrice,
      shippingAddress,
    });

    // Clear the cart after a successful order
    await Cart.findOneAndUpdate({ userId: req.user._id }, { products: [] });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get orders (own orders for a user, all orders for an admin)
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res, next) => {
  try {
    let orders;
    if (req.user.role === 'admin') {
      orders = await Order.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    }
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isOwner = order.userId._id.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.orderStatus = orderStatus || order.orderStatus;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
