const Product = require('../models/Product');

// @desc    Get all products (search, filter, sort, paginate)
// @route   GET /api/products
// @access  Public
// Query params: keyword, category, sort (price_asc|price_desc|newest), page, limit
const getProducts = async (req, res, next) => {
  try {
    const { keyword, category, sort, page = 1, limit = 8 } = req.query;

    const query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 8, 1);

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const categories = await Product.distinct('category');

    res.json({
      products,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      total,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const { title, description, price, category, stock, image, rating } = req.body;

    if (!title || !description || price === undefined || !category) {
      return res.status(400).json({ message: 'Please fill all required product fields' });
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock: stock ?? 0,
      image,
      rating,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const fields = ['title', 'description', 'price', 'category', 'stock', 'image', 'rating'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.deleteOne();
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Seed / Refresh products from external API
// @route   POST /api/products/seed
// @access  Public / Admin
const seedProductsHandler = async (req, res, next) => {
  try {
    const { seedProducts } = require('../seed/seedProducts');
    const result = await seedProducts({ force: true });
    res.json({ message: `Successfully seeded ${result.count} products from external API`, result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProductsHandler,
};

