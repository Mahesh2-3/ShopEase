// Run with: npm run seed
// Populates the database with real products/images from external APIs and an admin account.
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');
const { fetchExternalProducts } = require('../utils/productFetcher');

dotenv.config();

const seedProducts = async ({ force = true } = {}) => {
  try {
    const existingCount = await Product.countDocuments();
    if (!force && existingCount > 0) {
      console.log(`[Seed] Products already exist (${existingCount} found). Skipping auto-seed.`);
      return { seeded: false, count: existingCount };
    }

    console.log('[Seed] Fetching products from external API...');
    const productsToSeed = await fetchExternalProducts();

    if (force || existingCount === 0) {
      await Product.deleteMany();
      await Product.insertMany(productsToSeed);
      console.log(`[Seed] Successfully seeded ${productsToSeed.length} products with real images.`);
    }

    const adminExists = await User.findOne({ email: 'admin@shopease.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@shopease.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('[Seed] Seeded default admin user: admin@shopease.com / admin123');
    }

    return { seeded: true, count: productsToSeed.length };
  } catch (error) {
    console.error('[Seed] Seeding failed:', error.message);
    throw error;
  }
};

const mongoose = require('mongoose');

// Execute if run directly via CLI (node seed/seedProducts.js or npm run seed)
if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedProducts({ force: true });
      await mongoose.connection.close();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })();
}

module.exports = { seedProducts };
