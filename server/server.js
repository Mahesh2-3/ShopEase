const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/error");
const logger = require("./utils/logger");

const { seedProducts } = require("./seed/seedProducts");

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    // Auto-seed database if empty
    await seedProducts({ force: false });
  } catch (error) {
    logger.error("Database initialization failed during startup", {
      message: error.message,
    });
  }

  const app = express();

  // Middleware
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    }),
  );
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

  // Routes
  app.use("/api/auth", require("./routes/authRoutes"));
  app.use("/api/products", require("./routes/productRoutes"));
  app.use("/api/cart", require("./routes/cartRoutes"));
  app.use("/api/orders", require("./routes/orderRoutes"));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "ShopEase API is running" });
  });

  // Error handling (must be last)
  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    logger.info(`ShopEase server running on port ${PORT}`),
  );
};

startServer();
