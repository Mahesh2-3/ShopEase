const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/error");
const logger = require("./utils/logger");
const { seedProducts } = require("./seed/seedProducts");

dotenv.config();

const app = express();

// Ensure Database connection for serverless function calls
let isDbConnected = false;
app.use(async (req, res, next) => {
  if (!isDbConnected) {
    try {
      await connectDB();
      await seedProducts({ force: false });
      isDbConnected = true;
    } catch (error) {
      logger.error("Database connection failed", { message: error.message });
    }
  }
  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  logger.info("Incoming request", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });
  next();
});

// Root route for sanity check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "ShopEase Backend API is running" });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "ShopEase API is running" });
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

// Listen locally or on traditional Node servers
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    logger.info(`ShopEase server running on port ${PORT}`),
  );
}

// Export Express app for Vercel Serverless Functions
module.exports = app;
