const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Helper to populate + shape the cart response
const getPopulatedCart = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate('products.product');
  if (!cart) return { userId, products: [], totalAmount: 0 };

  const totalAmount = cart.products.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  return { ...cart.toObject(), totalAmount };
};

// @desc    Get logged-in user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
  try {
    const cart = await getPopulatedCart(req.user._id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a product to cart (or increase quantity if it exists)
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        products: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.products.find((item) => item.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += Number(quantity);
      } else {
        cart.products.push({ product: productId, quantity });
      }
      await cart.save();
    }

    const populatedCart = await getPopulatedCart(req.user._id);
    res.status(201).json(populatedCart);
  } catch (error) {
    next(error);
  }
};

// @desc    Update quantity of a cart item
// @route   PUT /api/cart/:id  (id = product id)
// @access  Private
const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.products.find((p) => p.product.toString() === req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await getPopulatedCart(req.user._id);
    res.json(populatedCart);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a single product from cart
// @route   DELETE /api/cart/:id  (id = product id)
// @access  Private
const removeCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter((p) => p.product.toString() !== req.params.id);
    await cart.save();

    const populatedCart = await getPopulatedCart(req.user._id);
    res.json(populatedCart);
  } catch (error) {
    next(error);
  }
};

// @desc    Clear the entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { products: [] },
      { new: true, upsert: true }
    );
    res.json({ userId: req.user._id, products: [], totalAmount: 0 });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
